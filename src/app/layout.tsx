import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Chakra_Petch } from "next/font/google";
import { Providers } from "./provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: `RMD | ReMeDy`,
  description: "The Remedy to Defi",
};

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
