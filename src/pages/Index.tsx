
import React, { useEffect, useState } from "react";
import { useQuran } from "@/context/QuranContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SurahCard from "@/components/SurahCard";
import { Surah } from "@/types";
import { Loader2 } from "lucide-react";

const Index: React.FC = () => {
  const { surahs, loading, error, fetchSurahs } = useQuran();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [illustrationLoaded, setIllustrationLoaded] = useState(false);

  // Fetch surahs on component mount
  useEffect(() => {
    fetchSurahs();
  }, [fetchSurahs]);

  // Filter surahs based on search query
  useEffect(() => {
    if (!surahs.length) return;

    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      setFilteredSurahs(surahs);
      return;
    }
    
    const filtered = surahs.filter((surah) => {
      const matchesName = surah.namaLatin.toLowerCase().includes(query);
      const matchesNumber = surah.nomor.toString() === query;
      const matchesTranslation = surah.arti.toLowerCase().includes(query);
      
      return matchesName || matchesNumber || matchesTranslation;
    });
    
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle illustration load
  const handleIllustrationLoad = () => {
    setIllustrationLoaded(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-10 md:py-16">
          <div className="container-custom">
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient animate-fade-in">
                Al-Qur'an Explorer
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                Read, listen, and explore the Holy Qur'an with elegant translation and intuitive navigation.
              </p>
            </div>

            {/* Quran Illustration */}
            <div className="max-w-xl mx-auto mb-12 px-4">
              <div 
                className={`relative overflow-hidden rounded-lg shadow-lg border border-gold-200 ${
                  illustrationLoaded ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: '200ms' }}
              >
                <img
                  src="/quran-illustration.png"
                  alt="Al-Qur'an Illustration"
                  className="w-full h-auto object-cover"
                  onLoad={handleIllustrationLoad}
                  onError={() => setIllustrationLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-quran-600/10 to-gold-500/10"></div>
              </div>
            </div>

            <SearchBar onSearch={handleSearch} />

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive">Error loading data. Please try again.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredSurahs.length > 0 ? (
                  filteredSurahs.map((surah) => (
                    <div key={surah.nomor} className="animate-fade-up" style={{ animationDelay: `${surah.nomor * 30}ms` }}>
                      <SurahCard surah={surah} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
