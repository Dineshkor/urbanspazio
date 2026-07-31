import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Urban Spazio | Defining Spaces, Defining Lifestyles",
  description:
    "Premium interior design studio offering consultation, turnkey execution, and bespoke luxury furniture. Specializing in Japandi, Neo Classical, Modern Contemporary, and Biophilic design for residential and commercial spaces.",
  keywords: [
    "interior design",
    "luxury interiors",
    "Japandi design",
    "biophilic design",
    "modular furniture",
    "interior designer India",
    "Urban Spazio",
  ],
  openGraph: {
    title: "Urban Spazio | Defining Spaces, Defining Lifestyles",
    description:
      "Premium interior design studio. Consultation, turnkey execution, and bespoke luxury furniture.",
    type: "website",
    locale: "en_IN",
    siteName: "Urban Spazio",
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
