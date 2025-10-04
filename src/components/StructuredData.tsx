'use client';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "avizith",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer specializing in Next.js, React, Node.js, and TypeScript. Building modern web applications with cutting-edge technologies.",
    "url": "https://avizith.vercel.app", // Vercel free domain
    "image": "https://avatars.githubusercontent.com/u/107170125?s=200&v=4",
    "sameAs": [
      "https://github.com/a-z-nath",
      "https://linkedin.com/in/a-z-nath",
    ],
    "knowsAbout": [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Git",
      "GitHub",
      "Full Stack Development",
      "Web Development",
      "JavaScript",
      "Frontend Development",
      "Backend Development"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Shahjalal University of Science and Technology, Sylhet"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Available for opportunities"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}