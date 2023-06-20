import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Chakra_Petch } from "next/font/google";
import { Providers } from "./provider";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const priceReq = await fetch(
    `https://api.dexscreener.com/latest/dex/pairs/bsc/0x766d7ed89297cc97ffbc8101a78438b3d59ae087`
  );
  try {
    const response = await priceReq.json();
    const price = response.pairs[0].priceUsd;

    return {
      title: `RMD | $${price}`,
      description: "The Remedy to Defi",
    };
  } catch (_) {}
  return {
    title: `RMD`,
    description: "The Remedy to Defi",
  };
}

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

// export const metadata = {
//   title: "RMD | ReMeDy",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${chakra.className} `}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
