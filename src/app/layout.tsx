import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { TransitionProvider } from "@/contexts/transition-context";

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
    <html lang="en">
      <body className="antialiased">
        <TransitionProvider>
          {children}
        </TransitionProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}