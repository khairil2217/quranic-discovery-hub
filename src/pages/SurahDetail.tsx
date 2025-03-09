
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuran } from "@/context/QuranContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseItem from "@/components/VerseItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Play } from "lucide-react";

const SurahDetail: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const { currentSurah, loading, error, fetchSurahDetail } = useQuran();
  const navigate = useNavigate();

  useEffect(() => {
    if (number) {
      fetchSurahDetail(parseInt(number, 10));
      window.scrollTo(0, 0);
    }
  }, [number, fetchSurahDetail]);

  const handlePlayFullAudio = () => {
    if (currentSurah?.audioFull?.['05']) {
      const audio = new Audio(currentSurah.audioFull['05']);
      audio.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    }
  };

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
              <span>Back to Surah List</span>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">Error loading data. Please try again.</p>
            </div>
          ) : currentSurah ? (
            <>
              <div className="mb-10 md:mb-16 text-center max-w-3xl mx-auto animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-gradient">
                  {currentSurah.namaLatin}
                </h1>
                <p className="text-xl mb-6 text-foreground">
                  {currentSurah.arti}
                </p>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-quran-50 dark:bg-quran-900/40 px-3 py-1.5 rounded-md">
                    <span className="text-sm font-medium text-quran-700 dark:text-quran-300 capitalize">
                      {currentSurah.tempatTurun.toLowerCase()}
                    </span>
                  </div>
                  <div className="bg-quran-50 dark:bg-quran-900/40 px-3 py-1.5 rounded-md">
                    <span className="text-sm font-medium text-quran-700 dark:text-quran-300">
                      {currentSurah.jumlahAyat} verses
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handlePlayFullAudio}
                  className="bg-quran-600 hover:bg-quran-700 gap-2"
                >
                  <Play className="h-4 w-4" />
                  Play Full Surah
                </Button>
                <p className="mt-6 text-base text-muted-foreground">
                  {currentSurah.deskripsi.substring(0, 200)}...
                </p>
              </div>

              {/* Verses */}
              <div className="space-y-6 mb-16">
                {currentSurah.ayat.map((verse) => (
                  <VerseItem 
                    key={verse.id} 
                    verse={verse} 
                    surahName={currentSurah.namaLatin}
                  />
                ))}
              </div>

              {/* Navigation between surahs */}
              <div className="flex justify-between items-center mt-10 mb-10 border-t pt-6">
                {currentSurah.suratSebelumnya ? (
                  <Link
                    to={`/surah/${currentSurah.suratSebelumnya.nomor}`}
                    className="flex items-center gap-2 text-quran-600 hover:text-quran-700 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Previous Surah</p>
                      <p className="font-medium">{currentSurah.suratSebelumnya.namaLatin}</p>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {currentSurah.suratSelanjutnya ? (
                  <Link
                    to={`/surah/${currentSurah.suratSelanjutnya.nomor}`}
                    className="flex items-center gap-2 text-quran-600 hover:text-quran-700 transition-colors text-right"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground">Next Surah</p>
                      <p className="font-medium">{currentSurah.suratSelanjutnya.namaLatin}</p>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Surah not found</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SurahDetail;
