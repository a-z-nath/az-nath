'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  featured: boolean;
  display_order: number | null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [mounted]);

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      React: '#61dafb',
      'Next.js': '#000000',
      HTML: '#e34f26',
      CSS: '#1572b6',
      PHP: '#777bb4',
      Java: '#ed8b00',
      'C++': '#00599c',
    };
    return colors[language || ''] || '#6b7280';
  };

  if (!mounted || loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Featured Projects
          </h2>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
            <p className="text-red-400">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
          Featured Projects
        </h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No featured projects found. Make sure to add the "featured" topic to your GitHub repositories!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-amber-600/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-600 transition-colors mb-2 sm:mb-0">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {project.language && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        ></div>
                        <span>{project.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{project.stargazers_count}</span>
                    </div>
                  </div>
                </div>

                {project.description && (
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                )}

                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    View Code
                  </a>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-gray-900 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}