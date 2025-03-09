
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form 
      onSubmit={handleSearch}
      className="w-full flex items-center gap-2 relative mb-8 max-w-md mx-auto"
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search by surah name or number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-10 py-6 text-base rounded-full border-2 border-muted transition-colors hover:border-primary/40 focus-visible:ring-primary/30 shadow-sm hover:shadow"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Button 
        type="submit"
        className="bg-quran-600 hover:bg-quran-700 text-white rounded-full px-5 py-6 shadow-sm transition-all hover:shadow font-medium"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
