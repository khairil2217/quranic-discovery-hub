
import React from "react";
import { Link } from "react-router-dom";
import { Surah } from "@/types";
import { Card } from "@/components/ui/card";
import { Book } from "lucide-react";

interface SurahCardProps {
  surah: Surah;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah }) => {
  return (
    <Link to={`/surah/${surah.nomor}`} className="block">
      <Card className="card-hover overflow-hidden h-full bg-card border transition-all duration-300 hover:border-quran-300 dark:hover:border-quran-700">
        <div className="relative p-6">
          {/* Surah number */}
          <div className="absolute top-4 right-4 flex items-center justify-center h-9 w-9 rounded-full bg-quran-100 dark:bg-quran-900/60">
            <span className="font-semibold text-quran-700 dark:text-quran-300 text-sm">{surah.nomor}</span>
          </div>
          
          {/* Icon and Surah name */}
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-md bg-quran-50 dark:bg-quran-900/40">
              <Book className="h-5 w-5 text-quran-600 dark:text-quran-400" />
            </div>
            <div>
              <h3 className="font-bold text-xl tracking-tight mb-1">{surah.namaLatin}</h3>
              <p className="text-sm text-muted-foreground">{surah.arti}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{surah.jumlahAyat} verses</span>
            </div>
            <div className="bg-quran-50 dark:bg-quran-900/40 px-2.5 py-1 rounded-md">
              <span className="text-sm font-medium text-quran-700 dark:text-quran-300 capitalize">
                {surah.tempatTurun.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SurahCard;
