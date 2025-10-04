'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "Problem Solver", 
    "Tech Enthusiast",
    "Open Source Contributor"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 pt-20">
      <div className="max-w-2xl mx-auto w-full">
        <div className="space-y-8">
          {/* Profile Image */}
          <div className="flex justify-center sm:justify-start">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 p-1">
                <img 
                  src="https://avatars.githubusercontent.com/u/107170125?s=200&v=4" 
                  alt="Avizith Debnath" 
                  className="w-full h-full rounded-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center sm:text-left space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Hi, I'm{' '}
                <span className="text-primary">Avizith Debnath</span>
              </h1>
              <div className="h-8 sm:h-10">
                <p className="text-xl sm:text-2xl text-muted-foreground transition-all duration-500">
                  {roles[currentRole]}
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto sm:mx-0 leading-relaxed">
              4th-year Computer Science student at SUST. I love building new things and fixing broken ones. 
              Always excited about learning new technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 justify-center sm:justify-start pt-4">
              <a 
                href="https://github.com/a-z-nath" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/a-z-nath" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="mailto:at.avijit.deb@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}