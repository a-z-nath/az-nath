import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "avizith - Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in Next.js, React, Node.js, and TypeScript. Building modern web applications with cutting-edge technologies.",
  keywords: ["Full Stack Developer", "Next.js", "React", "Node.js", "TypeScript", "Web Developer", "Portfolio", "avizith"],
  authors: [{ name: "avizith" }],
  creator: "avizith",
  publisher: "avizith",
  metadataBase: new URL('https://avizith.vercel.app'), // Vercel free domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "avizith - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in Next.js, React, Node.js, and TypeScript. Building modern web applications with cutting-edge technologies.",
    url: 'https://avizith.vercel.app', // Vercel free domain
    siteName: 'avizith Portfolio',
    images: [
      {
        url: '/og-image.jpg', // We'll create this
        width: 1200,
        height: 630,
        alt: 'avizith - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "avizith - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in Next.js, React, Node.js, and TypeScript. Building modern web applications with cutting-edge technologies.",
    images: ['/og-image.jpg'], // We'll create this
    creator: '@avizith', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e05d38" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
