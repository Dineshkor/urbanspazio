import type { Metadata } from "next";
import { Bodoni_Moda, Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Urban Spazio | Defining Spaces, Defining Lifestyles",
  description:
    "Premium minimalist interior design studio offering consultation, turnkey execution, and bespoke luxury furniture. Specializing in Japandi, Neo Classical, Modern Contemporary, and Biophilic design.",
  keywords: [
    "interior design",
    "minimalist interiors",
    "Fragilita font",
    "Japandi design",
    "biophilic design",
    "modular furniture",
    "Urban Spazio",
  ],
  openGraph: {
    title: "Urban Spazio | Defining Spaces, Defining Lifestyles",
    description:
      "Premium minimalist interior design studio. Consultation, turnkey execution, and bespoke luxury furniture.",
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
      className={`${bodoni.variable} ${cinzel.variable} ${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased font-helvetica">
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
