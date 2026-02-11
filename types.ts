export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source_name: string;
  url: string;
  published_at: string;
  category: string;
  image_url: string;
}

export type AppState = 'IDLE' | 'LOADING' | 'LOADED' | 'ERROR';

export type Language = 'IT' | 'EN';

export interface Translation {
  heroHeadline: string;
  heroSubheadline: string;
  syncButton: string;
  syncingButton: string;
  emptyState: string;
  lastUpdated: string;
  errorTimeout: string;
  errorJson: string;
  errorNetwork: string;
  errorServer: string;
  categories: {
    [key: string]: string;
  };
  labels: {
    via: string;
    readMore: string;
  }
}