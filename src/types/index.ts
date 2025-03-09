
// Surah List API Response
export interface SurahListResponse {
  code: number;
  message: string;
  data: Surah[];
}

// Surah object from list endpoint
export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

// Surah Detail API Response
export interface SurahDetailResponse {
  code: number;
  message: string;
  data: SurahDetail;
}

// Detailed Surah object
export interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
  ayat: Verse[];
  suratSelanjutnya: NextPrevSurah | null;
  suratSebelumnya: NextPrevSurah | null;
}

// Verse object
export interface Verse {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
}

// Next/Previous Surah
export interface NextPrevSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

// User settings
export interface Settings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Bookmark interface
export interface Bookmark {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  verseText: string;
  timestamp: number;
}
