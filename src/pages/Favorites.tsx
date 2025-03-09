
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuran } from "@/context/QuranContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkX, BookOpen } from "lucide-react";

const Favorites: React.FC = () => {
  const { bookmarks, removeBookmark } = useQuran();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="container-custom py-8 md:py-12">
          {/* Back button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-muted/50 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </Button>
          </div>

          <div className="mb-10 text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-bold mb-2 tracking-tight text-gradient">
              Bookmarked Verses
            </h1>
            <p className="text-lg text-muted-foreground">
              Your saved verses for quick access
            </p>
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="mx-auto flex justify-center mb-6">
                <BookOpen className="h-16 w-16 text-muted-foreground/50" />
              </div>
              <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
              <p className="text-muted-foreground mb-8">
                Add verses to your bookmarks for easy access when you return
              </p>
              <Button asChild>
                <Link to="/">Browse Surahs</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-up">
              {bookmarks.map((bookmark, index) => (
                <Card key={`${bookmark.surahNumber}-${bookmark.verseNumber}-${index}`} className="p-6 border">
                  <div className="flex justify-between items-start mb-4">
                    <Link
                      to={`/surah/${bookmark.surahNumber}`}
                      className="text-quran-600 hover:text-quran-700 transition-colors"
                    >
                      <h3 className="font-medium">
                        {bookmark.surahName} <span className="text-muted-foreground">({bookmark.surahNumber}:{bookmark.verseNumber})</span>
                      </h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBookmark(bookmark.surahNumber, bookmark.verseNumber)}
                      className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    >
                      <BookmarkX className="h-4 w-4" />
                      <span className="sr-only">Remove bookmark</span>
                    </Button>
                  </div>
                  <div className="arabic-text mb-4">
                    <p className="text-2xl font-arabic">{bookmark.verseText}</p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to={`/surah/${bookmark.surahNumber}`}
                      className="text-sm text-quran-600 hover:text-quran-700 transition-colors"
                    >
                      Go to Surah
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
