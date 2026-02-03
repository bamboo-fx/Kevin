import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { TransitionProvider } from "@/contexts/transition-context";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kevin Xia",
  description: "Personal portfolio of Kevin Xia - CS + Math student at Harvey Mudd, builder, and creator.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <TransitionProvider>
          {children}
        </TransitionProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}