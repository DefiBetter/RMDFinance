"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Chakra_Petch } from "next/font/google";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { Suspense, useEffect, useState } from "react";
import { Providers } from "./provider";

export const metadata = {
  title: "ReMeDy",
  description: "A simple portfolio, for fun",
};

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <body className={`${chakra.className} `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
