'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const scrollToSection = (sectionId: string) => {
    if (!mounted) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-amber-600">
            &lt;a-z-nath/&gt;
          </div>
          <div className="flex space-x-6 text-sm">
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-amber-600 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-amber-600 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}