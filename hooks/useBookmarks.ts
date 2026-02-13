import { useState, useCallback } from 'react';

const STORAGE_KEY = 'segnaleai-bookmarks';

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(loadBookmarks);

  const toggle = useCallback((id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(bid => bid !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  return { bookmarkedIds, toggle, isBookmarked };
}
