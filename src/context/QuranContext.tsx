
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { Surah, SurahDetail, Bookmark, Settings } from "@/types";

interface QuranContextProps {
  surahs: Surah[];
  loading: boolean;
  error: string | null;
  currentSurah: SurahDetail | null;
  settings: Settings;
  bookmarks: Bookmark[];
  fetchSurahs: () => Promise<void>;
  fetchSurahDetail: (number: number) => Promise<void>;
  toggleDarkMode: () => void;
  setFontSize: (size: Settings['fontSize']) => void;
  addBookmark: (surahNumber: number, surahName: string, verseNumber: number, verseText: string) => void;
  removeBookmark: (surahNumber: number, verseNumber: number) => void;
  isBookmarked: (surahNumber: number, verseNumber: number) => boolean;
}

const QuranContext = createContext<QuranContextProps | undefined>(undefined);

export const QuranProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load settings from localStorage
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('quran-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return { darkMode: prefersDarkMode, fontSize: 'medium' };
  });
  
  // Load bookmarks from localStorage
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const savedBookmarks = localStorage.getItem('quran-bookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Apply dark mode setting
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('quran-settings', JSON.stringify(settings));
  }, [settings]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Fetch all surahs
  const fetchSurahs = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://equran.id/api/v2/surat');
      
      if (!response.ok) {
        throw new Error('Failed to fetch surahs');
      }
      
      const data = await response.json();
      setSurahs(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific surah
  const fetchSurahDetail = async (number: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://equran.id/api/v2/surat/${number}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch surah details');
      }
      
      const data = await response.json();
      setCurrentSurah(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  // Set font size
  const setFontSize = (size: Settings['fontSize']): void => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  // Add a bookmark
  const addBookmark = (surahNumber: number, surahName: string, verseNumber: number, verseText: string): void => {
    const newBookmark: Bookmark = {
      surahNumber,
      surahName,
      verseNumber,
      verseText,
      timestamp: Date.now(),
    };
    
    setBookmarks(prev => [newBookmark, ...prev]);
    toast.success('Verse bookmarked');
  };

  // Remove a bookmark
  const removeBookmark = (surahNumber: number, verseNumber: number): void => {
    setBookmarks(prev => 
      prev.filter(bookmark => 
        bookmark.surahNumber !== surahNumber || bookmark.verseNumber !== verseNumber
      )
    );
    toast.success('Bookmark removed');
  };

  // Check if a verse is bookmarked
  const isBookmarked = (surahNumber: number, verseNumber: number): boolean => {
    return bookmarks.some(
      bookmark => bookmark.surahNumber === surahNumber && bookmark.verseNumber === verseNumber
    );
  };

  const value = {
    surahs,
    loading,
    error,
    currentSurah,
    settings,
    bookmarks,
    fetchSurahs,
    fetchSurahDetail,
    toggleDarkMode,
    setFontSize,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };

  return <QuranContext.Provider value={value}>{children}</QuranContext.Provider>;
};

export const useQuran = (): QuranContextProps => {
  const context = useContext(QuranContext);
  
  if (context === undefined) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  
  return context;
};
