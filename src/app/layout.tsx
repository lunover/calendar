import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nepali Calendar",
  description: "Nepali Calendar",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background min-h-screen sm:p-2 md:p-4 lg:p-6">
            {children}

            <footer className="p-4">
              <p>
                © {new Date().getFullYear()} Open source project by{" "}
                <a
                  href="https://lunover.com"
                  target="_blank"
                  className="underline"
                >
                  Lunover
                </a>
                . Check out the source code on{" "}
                <a
                  href="https://github.com/lunover/calendar"
                  target="_blank"
                  className="underline"
                >
                  GitHub
                </a>
                .
              </p>
            </footer>
          </div>

          <Toaster />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
