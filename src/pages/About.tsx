
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Headphones, Search, Heart, Moon, Settings } from "lucide-react";

const About: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-quran-600" />,
      title: "Complete Qur'an",
      description: "Access all 114 surahs with Arabic text, transliteration, and translation.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-quran-600" />,
      title: "Audio Recitation",
      description: "Listen to high-quality audio recitation for each verse and full surahs.",
    },
    {
      icon: <Search className="h-6 w-6 text-quran-600" />,
      title: "Easy Search",
      description: "Find surahs quickly by name, number, or translation.",
    },
    {
      icon: <Heart className="h-6 w-6 text-quran-600" />,
      title: "Bookmarks",
      description: "Save your favorite verses for quick access later.",
    },
    {
      icon: <Moon className="h-6 w-6 text-quran-600" />,
      title: "Dark Mode",
      description: "Toggle between light and dark themes for comfortable reading.",
    },
    {
      icon: <Settings className="h-6 w-6 text-quran-600" />,
      title: "Customization",
      description: "Adjust font size and other settings for a personalized experience.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="container-custom py-8 md:py-16">
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

          <div className="mb-16 text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gradient">
              About Quranic Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              A beautiful and intuitive application for exploring the Holy Qur'an
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 border rounded-lg bg-background animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-md bg-quran-50 dark:bg-quran-900/40 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mb-16 animate-fade-up" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-gradient">About this Project</h2>
            <p className="text-muted-foreground mb-4">
              This Qur'an application was developed to provide Muslims and those interested in Islamic studies with a 
              beautiful, modern, and user-friendly way to read and listen to the Holy Qur'an.
            </p>
            <p className="text-muted-foreground mb-4">
              The application is powered by the EQuran.id API, which provides comprehensive data including Arabic text, 
              transliteration, translation, and audio recitations.
            </p>
            <p className="text-muted-foreground">
              We hope this application helps you in your journey of exploring and understanding the Qur'an.
            </p>
          </div>

          <div className="text-center animate-fade-up" style={{ animationDelay: '700ms' }}>
            <h3 className="text-xl font-semibold mb-4">Start Exploring</h3>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-quran-600 hover:bg-quran-700"
            >
              Browse Surahs
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
