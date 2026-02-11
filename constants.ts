import { Translation, NewsItem } from './types';

export const CATEGORIES = [
  'models',
  'products',
  'research',
  'regulation',
  'funding',
  'open-source',
  'industry'
] as const;

export const TRANSLATIONS: Record<'IT' | 'EN', Translation> = {
  IT: {
    heroHeadline: "Il tuo Daily AI.",
    heroSubheadline: "I segnali che contano, curati per professionisti. Niente rumore, solo evoluzione.",
    syncButton: "Aggiorna Feed",
    syncingButton: "Analisi in corso...",
    emptyState: "Il feed è vuoto. Premi Aggiorna Feed per ricevere gli ultimi segnali.",
    lastUpdated: "Ultimo check",
    errorTimeout: "Il server non ha risposto in tempo.",
    errorJson: "Errore nei dati.",
    errorNetwork: "Nessuna connessione.",
    errorServer: "Servizio non disponibile.",
    categories: {
      'all': 'Tutti',
      'models': 'Modelli',
      'products': 'Prodotti',
      'research': 'Ricerca',
      'regulation': 'Policy',
      'funding': 'Funding',
      'open-source': 'Open Source',
      'industry': 'Business',
      'altro': 'Altro'
    },
    labels: {
      via: "Fonte:",
      readMore: "Approfondisci"
    }
  },
  EN: {
    heroHeadline: "Your Daily AI.",
    heroSubheadline: "Signals that matter, curated for professionals. No noise, just evolution.",
    syncButton: "Refresh Feed",
    syncingButton: "Analyzing...",
    emptyState: "Feed is empty. Press Refresh Feed to get the latest signals.",
    lastUpdated: "Last check",
    errorTimeout: "Server timeout.",
    errorJson: "Data error.",
    errorNetwork: "No connection.",
    errorServer: "Service unavailable.",
    categories: {
      'all': 'All',
      'models': 'Models',
      'products': 'Products',
      'research': 'Research',
      'regulation': 'Policy',
      'funding': 'Funding',
      'open-source': 'Open Source',
      'industry': 'Business',
      'altro': 'Other'
    },
    labels: {
      via: "Source:",
      readMore: "Read more"
    }
  }
};

export const MOCK_NEWS_DATA: NewsItem[] = [
  {
    id: "nws-1",
    title: "OpenAI: GPT-5 supera HumanEval con il 98% di accuratezza",
    summary: "I nuovi benchmark trapelati mostrano capacità di reasoning superiori a qualsiasi modello precedente, specialmente in compiti matematici complessi.",
    source_name: "The Verge",
    url: "#",
    published_at: new Date().toISOString(),
    category: "models",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-2",
    title: "Google DeepMind svela Gemini 2.0 Pro",
    summary: "Multimodalità nativa migliorata e una finestra di contesto da 10M token. Il modello sarà disponibile per gli sviluppatori a partire dalla prossima settimana.",
    source_name: "Google Blog",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    category: "models",
    image_url: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-3",
    title: "NVIDIA acquisisce startup di chip neuromorfici per $2B",
    summary: "Una mossa strategica per ridurre il consumo energetico dei data center AI del 40% entro il 2027.",
    source_name: "Bloomberg",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    category: "industry",
    image_url: "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-4",
    title: "Meta rilascia Llama 4 70B con licenza permissiva",
    summary: "Mark Zuckerberg conferma l'impegno sull'open source. Il modello compete direttamente con GPT-4 nelle task di codifica e traduzione.",
    source_name: "Meta AI",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    category: "open-source",
    image_url: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-5",
    title: "L'UE finalizza le linee guida per l'AI Act",
    summary: "Nuovi standard per i sistemi ad alto rischio entreranno in vigore a Giugno. Previste sanzioni fino al 7% del fatturato globale.",
    source_name: "Politico EU",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    category: "regulation",
    image_url: "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-6",
    title: "Apple integra l'AI generativa in Xcode 16",
    summary: "Gli sviluppatori iOS possono ora generare intere interfacce SwiftUI tramite prompt in linguaggio naturale direttamente nell'IDE.",
    source_name: "9to5Mac",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    category: "products",
    image_url: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-7",
    title: "Figure 02: Il robot umanoide impara osservando video YouTube",
    summary: "Nuova tecnica di 'Video-to-Action' permette ai robot di apprendere compiti manuali complessi senza teleoperazione umana.",
    source_name: "TechCrunch",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    category: "research",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-8",
    title: "Perplexity AI lancia la ricerca Enterprise",
    summary: "Nuova suite dedicata alle aziende con privacy garantita e indicizzazione dei documenti interni sicura.",
    source_name: "VentureBeat",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    category: "products",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "nws-9",
    title: "Mistral Large ora disponibile su Amazon Bedrock",
    summary: "La partnership strategica espande la disponibilità dei modelli europei sul cloud americano.",
    source_name: "AWS News",
    url: "#",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    category: "industry",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  }
];