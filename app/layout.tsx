import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Dancing_Script, Inter, Playfair_Display, Pinyon_Script, Alex_Brush } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const alex = Alex_Brush({
  variable: "--font-alex",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Urbn Spazio | Defining Spaces, Defining Lifestyles",
  description:
    "Premium minimalist interior design studio offering consultation, turnkey execution, and bespoke luxury furniture. Specializing in Japandi, Neo Classical, Modern Contemporary, and Biophilic design.",
  keywords: [
    "interior design",
    "luxury interiors",
    "Japandi design",
    "biophilic design",
    "modular furniture",
    "Urbn Spazio",
    "Delhi NCR interior designer",
  ],
  openGraph: {
    title: "Urbn Spazio | Defining Spaces, Defining Lifestyles",
    description:
      "Premium minimalist interior design studio. Consultation, turnkey execution, and bespoke luxury furniture.",
    type: "website",
    locale: "en_IN",
    siteName: "Urbn Spazio",
  },
  icons: {
    icon: "/images/logo-cropped.png",
    apple: "/images/logo-cropped.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${script.variable} ${pinyon.variable} ${alex.variable} ${playfair.variable} ${inter.variable}`}
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
