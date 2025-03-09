
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Github, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-6 md:py-8 bg-background">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-quran-600" />
          <Link to="/" className="text-lg font-semibold text-gradient">
            Quranic Hub
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Surah List
            </Link>
            <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Bookmarks
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <span>Made with</span>
          <Heart className="h-3 w-3 text-red-500" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
