import "./globals.css";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";

export const metadata = {
  title: "Fates.",
  description: "A simple portfolio, for fun",
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const aquireFont = localFont({
  variable: "--font-aquire",
  src: [
    {
      path: "../statics/fonts/AquireRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../statics/fonts/AquireBold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${aquireFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
