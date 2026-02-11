import { MOCK_NEWS_DATA } from '../constants';
import { NewsItem } from '../types';

// Simulates the call to n8n webhook
export const fetchNews = async (): Promise<NewsItem[]> => {
  return new Promise((resolve, reject) => {
    // Simulate network latency (1.5s - 3s)
    const latency = 1500 + Math.random() * 1500;
    
    // Simulate a random error rate (5% chance of failure) to demonstrate error handling
    const shouldFail = Math.random() < 0.05;

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Random network simulation error"));
      } else {
        // Return deep copy to prevent mutation issues in mock
        resolve(JSON.parse(JSON.stringify(MOCK_NEWS_DATA)));
      }
    }, latency);
  });
};