import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palate - AI Menu Assistant",
  description: "Your AI-powered menu assistant for personalized restaurant recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Recursive:wght@300..1000&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'Recursive, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
