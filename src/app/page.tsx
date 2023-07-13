"use client";
import { motion } from "framer-motion";
// import Swap from "../components/Swap";
// import Chart from "../components/Chart";
import {
  // GiBuyCard,
  GiFizzingFlask,
  GiRoad,
  GiRocket,
  // GiSpellBook,
  // GiCheckMark,
  // GiTireIronCross,
} from "react-icons/gi";

import Presale from "../components/Presale/Presale";
import useChain from "../hooks/useChain";
import useTokenBalance from "../hooks/useTokenBalance";
import Roadmap from "../components/Roadmap/Roadmap";
import { useAccount } from "wagmi";
import { useWeb2Context } from "../contexts/web2Context";
import useTotalRaised from "../hooks/useTotalRaised";
import { chains } from "../statics/helpers/chains";

export default function Home() {
  const chainId = useChain();
  const { address } = useAccount();
  // const nativeBalance = useTokenBalance(undefined);
  const rmdBalance = useTokenBalance(chains[chainId].contracts.rmd.address);
  const usdcBalance = useTokenBalance(chains[chainId].contracts.usdc.address);
  const web2Context = useWeb2Context();
  const { totalRaised, totalRaisedPercent, target } = useTotalRaised();

  return (
    <>
      <section className="relative z-10 w-full px-4 md:px-7 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4 pb-16">
        <motion.div
          initial={{ translateX: "-1000px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center md:w-1/2 h-full mt-0 md:mt-16 w-full"
        >
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
          <div className="flex justify-center text-center mt-24 md:mt-10 text-slate-200 w-full">
            RMD is the first ever omni-chain reflection token, leveraging
            bleeding edge technology to deliver maximum returns to you as
            seamless as never before!
          </div>
          <a
            href="#roadmap"
            className="flex justify-center w-full md:w-1/2 h-16 mt-5"
          >
            <div className="rounded-md shadow-lg backdrop-blur-md group cursor-pointer relative w-full flex justify-center items-center outline outline-1 outline-slate-100/20 h-full hover:text-black bg-slate-100/20 transition-colors duration-500">
              <div className="z-10 font-bold flex items-center gap-4">
                OUR ROADMAP
                <GiRoad
                  size={25}
                  className="text-green-400 group-hover:text-black transition-colors group-hover:animate-wiggle"
                />
              </div>
              <div className="rounded-md z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            </div>
          </a>
        </motion.div>
        <motion.div
          initial={{ translateX: "1000px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/3"
        >
          <Presale
            rmdPrice={web2Context ? web2Context.rmdPrice : null}
            usdcPrice={web2Context ? web2Context.usdcPrice : null}
            chainId={chainId}
            address={address as string}
            usdcBalance={usdcBalance ? usdcBalance?.formatted : "0.00"}
            rmdBalance={rmdBalance ? rmdBalance.value : (BigInt("0") as bigint)}
            rmdBalanceFormatted={rmdBalance ? rmdBalance.formatted : "0.00"}
            totalRaised={totalRaised}
            totalRaisedPercent={totalRaisedPercent}
            target={target}
          />
        </motion.div>
      </section>
      <Roadmap />
    </>
  );

  {
    /* <section
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
      </section> */
  }
}
