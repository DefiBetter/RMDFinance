"use client";
import Header from "@/src/components/Header";
import BackgroundLines from "@/src/components/BackgroundLines";
import { motion } from "framer-motion";
import useSWR from "swr";
import Swap from "../components/Swap";
import Chart from "../components/Chart";
import Script from "next/script";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function Home() {
  const { data: rmdData } = useSWR(
    `https://api.dexscreener.com/latest/dex/pairs/bsc/0x766d7ed89297cc97ffbc8101a78438b3d59ae087`,
    fetcher,
    { refreshInterval: 30000 }
  );

  const { data: bnbData } = useSWR(
    `https://api.dexscreener.com/latest/dex/pairs/bsc/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16`,
    fetcher,
    { refreshInterval: 30000 }
  );

  return (
    <main className="flex items-stretch justify-center">
      <Header priceUSD={rmdData?.pairs[0].priceUsd} />
      <BackgroundLines />
      <video
        autoPlay
        muted
        loop
        className="object-cover w-screen h-screen fixed opacity-30"
      >
        <source src={"/videos/smoke.mp4"} type="video/mp4" />
      </video>

      {/* Screen height - Header height - header top spacing */}
      <section className="relative w-full px-4 md:px-7 flex items-stretch z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-56 md:mt-32 w-full flex flex-col md:flex-row items-center gap-5"
        >
          <Swap
            rmdPrice={rmdData?.pairs[0].priceUsd}
            bnbPrice={bnbData?.pairs[0].priceUsd}
          />

          <Chart />
          {/* <ReferralProgram /> */}
        </motion.div>
      </section>
    </main>
  );
}

{
  /* <Suspense fallback={<div>Loading</div>}>
<ViewCounter />
</Suspense> */
}
