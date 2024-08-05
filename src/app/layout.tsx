import "@/styles/globals.css";
import { Viewport } from "next";
import { Nunito } from "next/font/google";

import { Providers } from "./providers";
const nunito = Nunito({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="dark" lang="en">
      <body
        className={`min-h-screen font-sans antialiased ${nunito.className}`}
      >
        <Providers>
          <div className="container mx-auto pt-16 px-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
