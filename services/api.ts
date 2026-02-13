import { NewsItem } from '../types';
import { supabase } from './supabase';

// --- n8n MCP configuration ---
const MCP_SERVER_URL = '/mcp-server/http';
const MCP_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWViNWFlYS1hMzEwLTQ2NzgtYmNjNi1hZWNhMjUzNDJhYmUiLCJpc3MiOiJuOG4iLCJhdWQiOiJtY3Atc2VydmVyLWFwaSIsImp0aSI6IjAxMGE0MGE4LWY2NzAtNDYzNi04MGFmLThmMDY0ZTdmZjA0MCIsImlhdCI6MTc3MDk3NjAwNH0.m3jwSxe0cjF_aPrYd4ftlo8h6PLtjH2o51RFNrzJUbI';
const WORKFLOW_ID = 'l0Z63SYOQj8QRoN2';

async function mcpRequest(method: string, params?: Record<string, unknown>): Promise<any> {
  const response = await fetch(MCP_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Authorization': MCP_AUTH_TOKEN,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      ...(params ? { params } : {}),
      id: Date.now(),
    }),
  });

  if (!response.ok) {
    throw new Error(`MCP request failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('Content-Type') || '';

  if (contentType.includes('text/event-stream')) {
    const text = await response.text();
    for (const line of text.split('\n')) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        if (data.error) throw new Error(data.error.message || 'MCP error');
        if (data.result) return data.result;
      }
    }
    throw new Error('No valid data in SSE response');
  }

  const json = await response.json();
  if (json.error) throw new Error(json.error.message || 'MCP error');
  return json.result;
}

/**
 * Extracts image URL from RSS item fields and HTML content.
 */
function extractImageUrl(json: any): string {
  // Direct image fields
  const direct = json.image_url || json.image || json.thumbnail
    || json['media:thumbnail'] || json['media$thumbnail']?.url
    || json['media:content']?.url || json['media$content']?.url;
  if (direct) return direct;

  // Enclosure (common RSS image field)
  const enclosure = json.enclosure;
  if (enclosure?.url && enclosure?.type?.startsWith('image')) return enclosure.url;
  if (enclosure?.url && /\.(jpg|jpeg|png|webp|gif)/i.test(enclosure.url)) return enclosure.url;

  // Extract from HTML content (description, content:encoded, etc.)
  const html = json['content:encoded'] || json.description || json.content || json.summary || '';
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1]) return imgMatch[1];

  // OG-style fields sometimes present
  if (json.og_image) return json.og_image;

  return '';
}

function extractSourceFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    const map: Record<string, string> = {
      'techcrunch.com': 'TechCrunch',
      'venturebeat.com': 'VentureBeat',
      'technologyreview.com': 'MIT Tech Review',
    };
    return map[hostname] || hostname;
  } catch {
    return 'Unknown';
  }
}

function guessCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  if (/open.?source|llama|hugging\s?face|github|release/.test(text)) return 'open-source';
  if (/gpt|gemini|claude|llm|model|benchmark|parameter/.test(text)) return 'models';
  if (/regulat|eu |act |policy|govern|law|ban/.test(text)) return 'regulation';
  if (/fund|rais|invest|valuat|\$\d|billion|million|acquisition|acquire/.test(text)) return 'funding';
  if (/research|paper|study|breakthrough|discover/.test(text)) return 'research';
  if (/product|launch|app|feature|tool|platform|service/.test(text)) return 'products';
  return 'industry';
}

/**
 * Parses the n8n workflow MCP result into news rows for Supabase.
 */
function parseWorkflowResult(result: any): Array<{
  title: string;
  summary: string;
  source_name: string;
  url: string;
  published_at: string;
  category: string;
  image_url: string;
}> {
  let parsed = result;
  if (result?.content) {
    const textContent = result.content.find((c: any) => c.type === 'text');
    if (textContent?.text) {
      parsed = JSON.parse(textContent.text);
    }
  }

  const runData = parsed?.result?.runData;
  const lastNode = parsed?.result?.lastNodeExecuted;
  if (!runData || !lastNode || !runData[lastNode]) {
    throw new Error('Unexpected workflow response structure');
  }

  const nodeOutput = runData[lastNode];
  const items: any[] = nodeOutput[0]?.data?.main?.[0] || [];

  return items.map((item: any) => {
    const json = item.json || item;
    return {
      title: json.title || 'Untitled',
      summary: json.description || json.summary || json.content || '',
      source_name: json.source || extractSourceFromUrl(json.url || ''),
      url: json.url || json.link || '#',
      published_at: json.created || json.pubDate || json.isoDate || json.published_at || new Date().toISOString(),
      category: json.category || guessCategory(json.title || '', json.description || json.summary || ''),
      image_url: extractImageUrl(json),
    };
  });
}

/**
 * Fetches the Open Graph image from an article page via a CORS-friendly proxy.
 */
async function fetchOgImage(articleUrl: string): Promise<string> {
  try {
    const resp = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(articleUrl)}`
    );
    if (!resp.ok) return '';
    const data = await resp.json();
    return data?.data?.image?.url || data?.data?.logo?.url || '';
  } catch {
    return '';
  }
}

/**
 * Enriches news rows that have no image_url by fetching OG images in parallel.
 */
async function enrichWithOgImages(
  rows: Array<{ title: string; summary: string; source_name: string; url: string; published_at: string; category: string; image_url: string }>
): Promise<typeof rows> {
  const tasks = rows.map(async (row) => {
    if (row.image_url) return row;
    const ogImage = await fetchOgImage(row.url);
    return { ...row, image_url: ogImage };
  });
  return Promise.all(tasks);
}

/**
 * Triggers n8n workflow, parses result, and upserts news into Supabase.
 */
async function fetchAndSaveNews(): Promise<void> {
  // Initialize MCP session
  await mcpRequest('initialize', {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: { name: 'SegnaleAI', version: '1.0.0' },
  });

  // Execute workflow
  const result = await mcpRequest('tools/call', {
    name: 'execute_workflow',
    arguments: {
      workflowId: WORKFLOW_ID,
      inputs: {
        type: 'webhook',
        webhookData: { method: 'GET' },
      },
    },
  });

  // Parse news from n8n response
  const rawRows = parseWorkflowResult(result);

  if (rawRows.length === 0) return;

  // Fetch real OG images for articles without images
  const newsRows = await enrichWithOgImages(rawRows);

  // Upsert into Supabase (use url as unique constraint to avoid duplicates)
  const { error } = await supabase
    .from('news')
    .upsert(newsRows, { onConflict: 'url' });

  if (error) {
    throw new Error(`Supabase upsert failed: ${error.message}`);
  }
}

/**
 * Reads news from Supabase.
 */
async function readNewsFromSupabase(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  return (data || []).map((row) => ({
    id: row.id,
    title: row.title || 'Untitled',
    summary: row.summary || '',
    source_name: row.source_name || '',
    url: row.url || '#',
    published_at: row.published_at || new Date().toISOString(),
    category: row.category || 'industry',
    image_url: row.image_url || '',
  }));
}

/**
 * Loads cached news from Supabase (no n8n trigger).
 */
export const loadNews = readNewsFromSupabase;

/**
 * Refreshes news: triggers n8n → parses result → saves to Supabase → reads from Supabase.
 */
export const refreshNews = async (): Promise<NewsItem[]> => {
  await fetchAndSaveNews();
  return readNewsFromSupabase();
};
