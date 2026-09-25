import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Mohammad El-Ashraf — Web Developer",
  description: "Portfolio of Ahmad Mohammad El-Ashraf, building thoughtful digital experiences with React, Next.js, and modern web technologies.",
  keywords: ["Web Developer", "React", "Next.js", "Frontend Developer", "JavaScript", "UI Design"],
  authors: [{ name: "Ahmad Mohammad El-Ashraf" }],
  openGraph: {
    title: "Ahmad Mohammad El-Ashraf — Web Developer",
    description: "Building dynamic and responsive web applications with modern technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Mohammad El-Ashraf — Web Developer",
    description: "Building dynamic and responsive web applications.",
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  robots: "index, follow",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#071c2b" />
        <link rel="canonical" href="https://el-ashraf.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmad Mohammad El-Ashraf",
              url: "https://el-ashraf.dev",
              jobTitle: "Web Developer",
              sameAs: [
                "https://linkedin.com/in/ahmadmohammad",
                "https://github.com/ahmadmohammad"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
