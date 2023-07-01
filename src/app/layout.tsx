import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Chakra_Petch } from "next/font/google";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Header from "../components/Header/Header";
import BackgroundDecoration from "../components/BackgroundDecoration";
import { Metadata } from "next";
import Web2Provider from "../contexts/web2Context";
import ToastProvider from "../contexts/ToastContext";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "RMD | ReMeDy",
    description: "The Remedy to Defi",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${chakra.className}`}>
        <BackgroundDecoration />
        <Providers>
          <Web2Provider>
            <ToastProvider>
              <main className="relative flex flex-col gap-20 items-center justify-center overflow-hidden">
                <Header />
                {children}
              </main>
            </ToastProvider>
          </Web2Provider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
