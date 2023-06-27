"use client";
import Header from "@/src/components/Header";
import BackgroundDecoration from "@/src/components/BackgroundDecoration";
import { motion } from "framer-motion";
import useSWR from "swr";
import Swap from "../components/Swap";
import Chart from "../components/Chart";
import {
  GiBuyCard,
  GiFizzingFlask,
  GiRocket,
  GiSpellBook,
} from "react-icons/gi";
import Presale from "../components/Presale/Presale";
import useChain from "../hooks/useChain";
import useTokenBalance from "../hooks/useTokenBalance";
import { contracts } from "../statics/contract";

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

  const chainId = useChain();
  const nativeBalance = useTokenBalance(undefined);
  const rmdBalance = useTokenBalance(contracts[chainId].rmd.address);
  const totalRaise = 245021;

  return (
    <main className="relative flex flex-col gap-20 items-center justify-center overflow-hidden">
      <Header priceUSD={rmdData?.pairs[0].priceUsd} />
      <BackgroundDecoration />

      {/* Header height + header margin top + gap between header and this section */}
      <motion.section
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        // h-[calc(100vh-17.75rem)] md:h-[calc(100vh-10.75rem)]
        className=" relative z-10 w-full px-4 md:px-7 flex flex-col md:flex-row justify-between md:justify-center items-center gap-10 md:gap-0 pb-16"
      >
        <div className="flex flex-col items-center md:w-1/2 h-full mt-0 md:mt-16 w-full">
          <h1 className="text-[7vw] md:text-[4vw] whitespace-nowrap font-bold flex items-center gap-2 md:gap-4">
            <span className="text-green-400">CRAFT</span> YOUR FUTURE{" "}
            <GiFizzingFlask className="text-green-400 animate-wiggle" />
          </h1>
          <h2 className="relative text-[6vw] md:text-[4vw] whitespace-nowrap font-bold flex items-center gap-2 md:gap-4">
            TO THE <span className="text-green-400">MOON</span>
            <motion.div
              animate={{ transform: "translate(1000px, -1000px) scale(5)" }}
              transition={{ delay: 3.5, duration: 2, ease: [0.8, 0, 0.58, 1] }}
              className="absolute left-full top-1/4 scale-100"
            >
              <GiRocket className="text-orange-400 -rotate-90" />
            </motion.div>
          </h2>
          <div className="flex justify-center mt-24 md:mt-10 text-slate-200 w-full">
            RMDv2 is the first omnichain meme coin ever made. Imagine not being
            part of this...
          </div>
          <a href="#" className="flex justify-center w-full md:w-1/2 h-16 mt-5">
            <div className="backdrop-blur-md group cursor-pointer relative w-full flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
              <div className="z-10 font-bold flex items-center gap-4">
                READ MORE
                <GiSpellBook
                  size={25}
                  className="text-green-400 group-hover:text-black transition-colors"
                />
              </div>
              <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            </div>
          </a>
        </div>
        <Presale
          rmdPrice={rmdData?.pairs[0].priceUsd}
          bnbPrice={bnbData?.pairs[0].priceUsd}
          chainId={chainId}
          nativeSymbol={nativeBalance ? nativeBalance?.symbol : ""}
          nativeBalance={nativeBalance ? nativeBalance?.formatted : "0.00"}
          rmdBalance={rmdBalance ? rmdBalance.value : (BigInt("0") as bigint)}
          rmdBalanceFormatted={rmdBalance ? rmdBalance.formatted : "0.00"}
          totalRaised={totalRaise}
        />
      </motion.section>

      {/* <section
        id="presale"
        className="relative w-full px-4 md:px-7 flex items-stretch z-10 overflow-hidden pb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="w-full flex flex-col md:flex-row items-center gap-5"
        >
          <Swap
            rmdPrice={rmdData?.pairs[0].priceUsd}
            bnbPrice={bnbData?.pairs[0].priceUsd}
          /> 
          <Chart />
          <ReferralProgram />
        </motion.div>
      </section> */}
    </main>
  );
}

{
  /* <Suspense fallback={<div>Loading</div>}>
<ViewCounter />
</Suspense> */
}
