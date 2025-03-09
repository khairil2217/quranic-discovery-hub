
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuran } from "@/context/QuranContext";
import { Moon, Sun, Menu, X, Bookmark, BookOpen, Home, Info } from "lucide-react";

const Navbar: React.FC = () => {
  const { toggleDarkMode, settings } = useQuran();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/90 border-b">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-all hover:opacity-80"
            onClick={closeMenu}
          >
            <BookOpen className="h-6 w-6 text-quran-600" />
            <span className="font-semibold text-xl tracking-tight text-gradient">Quranic Hub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-quran-600 ${isActive('/') ? 'text-quran-600' : 'text-foreground/70'}`}
          >
            Surah List
          </Link>
          <Link 
            to="/favorites" 
            className={`text-sm font-medium transition-colors hover:text-quran-600 ${isActive('/favorites') ? 'text-quran-600' : 'text-foreground/70'}`}
          >
            Bookmarks
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-quran-600 ${isActive('/about') ? 'text-quran-600' : 'text-foreground/70'}`}
          >
            About
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="ml-4"
          >
            {settings.darkMode ? (
              <Sun className="h-5 w-5 text-gold-400" />
            ) : (
              <Moon className="h-5 w-5 text-quran-600" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
          >
            {settings.darkMode ? (
              <Sun className="h-5 w-5 text-gold-400" />
            ) : (
              <Moon className="h-5 w-5 text-quran-600" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 p-4 bg-background border-b shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={closeMenu}
            >
              <Home className="h-5 w-5 text-quran-600" />
              <span className="font-medium">Surah List</span>
            </Link>
            <Link 
              to="/favorites" 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={closeMenu}
            >
              <Bookmark className="h-5 w-5 text-quran-600" />
              <span className="font-medium">Bookmarks</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={closeMenu}
            >
              <Info className="h-5 w-5 text-quran-600" />
              <span className="font-medium">About</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
