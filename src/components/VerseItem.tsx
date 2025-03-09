
import React, { useState } from "react";
import { useQuran } from "@/context/QuranContext";
import { Verse } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, Play, Pause } from "lucide-react";

interface VerseItemProps {
  verse: Verse;
  surahName: string;
}

const VerseItem: React.FC<VerseItemProps> = ({ verse, surahName }) => {
  const { settings, addBookmark, removeBookmark, isBookmarked } = useQuran();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(`https://equran.id/api/v2/ayat/${verse.id}/audio`));
  
  const bookmarked = isBookmarked(verse.surah, verse.nomor);

  // Handle font size classes
  const arabicFontSize = {
    small: "text-2xl",
    medium: "text-3xl",
    large: "text-4xl",
  }[settings.fontSize];

  const latinFontSize = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }[settings.fontSize];

  // Toggle audio playback
  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      // Stop all other playing audio elements
      document.querySelectorAll('audio').forEach(el => {
        if (el !== audio) {
          el.pause();
          el.currentTime = 0;
        }
      });
      
      audio.play().catch(error => {
        console.error("Audio playback error:", error);
      });
      setIsPlaying(true);
    }
  };

  // Update state when audio ends
  React.useEffect(() => {
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audio]);

  // Toggle bookmark
  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(verse.surah, verse.nomor);
    } else {
      addBookmark(verse.surah, surahName, verse.nomor, verse.ar);
    }
  };

  return (
    <Card className="w-full border p-5 md:p-6 animate-fade-up" style={{ animationDelay: `${verse.nomor * 50}ms` }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-quran-100 dark:bg-quran-900/60">
            <span className="font-semibold text-quran-700 dark:text-quran-300 text-sm">{verse.nomor}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-quran-50 dark:bg-quran-900/40 hover:bg-quran-100 dark:hover:bg-quran-800/60"
            onClick={toggleAudio}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-quran-700 dark:text-quran-300" />
            ) : (
              <Play className="h-4 w-4 text-quran-700 dark:text-quran-300" />
            )}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"} audio</span>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-quran-50 dark:bg-quran-900/40 hover:bg-quran-100 dark:hover:bg-quran-800/60"
            onClick={toggleBookmark}
          >
            {bookmarked ? (
              <BookmarkX className="h-4 w-4 text-quran-700 dark:text-quran-300" />
            ) : (
              <Bookmark className="h-4 w-4 text-quran-700 dark:text-quran-300" />
            )}
            <span className="sr-only">{bookmarked ? "Remove bookmark" : "Add bookmark"}</span>
          </Button>
        </div>
      </div>
      
      {/* Arabic text */}
      <div className="arabic-text mb-4 pr-2 leading-loose">
        <p className={`${arabicFontSize} font-arabic text-right`}>{verse.ar}</p>
      </div>
      
      {/* Transliteration */}
      <div className="mb-3">
        <p className={`${latinFontSize} italic text-muted-foreground`}>{verse.tr}</p>
      </div>
      
      {/* Translation */}
      <div>
        <p className={`${latinFontSize} text-foreground`}>{verse.idn}</p>
      </div>
    </Card>
  );
};

export default VerseItem;
