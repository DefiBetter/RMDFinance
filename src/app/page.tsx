"use client";
import Header from "@/src/components/Header";
import BackgroundDecoration from "@/src/components/BackgroundDecoration";
import { motion } from "framer-motion";
import useSWR from "swr";
import Swap from "../components/Swap";
import Chart from "../components/Chart";
import {
  GiBuyCard,
  GiCheckMark,
  GiFizzingFlask,
  GiRocket,
  GiTireIronCross,
} from "react-icons/gi";

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
    <main className="relative flex flex-col gap-20 items-center justify-center overflow-hidden">
      <Header priceUSD={rmdData?.pairs[0].priceUsd} />
      <BackgroundDecoration />

      {/* Header height + header margin top + gap between header and this section */}
      <motion.section
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className=" relative z-10 h-[calc(100vh-10.75rem)] w-full px-4 md:px-7 flex flex-col justify-center gap-10 items-center"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-[6vw] whitespace-nowrap font-bold flex items-center gap-2 md:gap-4">
            <span className="text-green-400">CRAFT</span> YOUR FUTURE{" "}
            <GiFizzingFlask className="text-green-400 animate-wiggle" />
          </h1>
          <h2 className="relative text-[5vw] whitespace-nowrap font-bold flex items-center gap-2 md:gap-4">
            TO THE <span className="text-green-400">MOON</span>
            <motion.div
              animate={{ transform: "translate(1000px, -1000px)" }}
              transition={{ delay: 3.5, duration: 2, ease: [0.8, 0, 0.58, 1] }}
              className="absolute left-full top-1/4"
            >
              <GiRocket className="text-orange-400 -rotate-90" />
            </motion.div>
          </h2>
        </div>

        <a
          href="#section2"
          className="flex justify-center w-full md:w-1/2 h-16"
        >
          <div className="backdrop-blur-md group cursor-pointer relative w-full flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
            <div className="z-10 font-bold flex items-center gap-4">
              BUY RMD
              <GiBuyCard
                size={25}
                className="text-green-400 group-hover:text-black transition-colors"
              />
            </div>
            <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </div>
        </a>
      </motion.section>

      <section
        id="section2"
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
          {/* <ReferralProgram /> */}
        </motion.div>
      </section>
      <section
        id="roadmap"
        className="relative z-10 w-full px-4 md:px-7 flex flex-col gap-10 md:gap-0 items-center py-16"
      >
        <h2 className="font-bold text-5xl md:text-7xl text-center">ROADMAP</h2>

        <motion.div
          key="stage1"
          initial={{ translateX: "-1000" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="mt-5 w-full flex justify-start items-center"
        >
          <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4 shadow-lg">
            <div className="text-green-400 text-5xl text-center font-bold">
              Stage <span className="text-slate-100">1</span>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <GiCheckMark size={20} className="text-green-400" />
              Roadmap release
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiCheckMark size={20} className="text-green-400" />
              Zealy quests release to earn whitelist spots
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              ███ Documentation release
            </div>
          </div>
        </motion.div>
        <motion.div
          key="stage2"
          initial={{ translateX: "1000" }}
          transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
          whileInView={{ translateX: 0 }}
          className="md:-mt-20 w-full flex justify-end"
        >
          <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4 shadow-lg">
            <div className="text-slate-100 text-5xl text-center font-bold">
              Stage <span className="text-green-400">2</span>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Closed alpha testing of ███
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Whitelist sale details
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Uncovering of Docs
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Influencers collaborations
            </div>
          </div>
        </motion.div>
        <motion.div
          key="stage3"
          initial={{ translateX: "-1000" }}
          transition={{ duration: 1, ease: "backInOut" }}
          whileInView={{ translateX: 0 }}
          className="md:-mt-20 w-full flex justify-start"
        >
          <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
            <div className="text-green-400 text-5xl text-center font-bold">
              Stage <span className="text-slate-100">3</span>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Unveiling of ███ in an exclusive AMA (details TBA)
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Start of ███ Whitelist sale
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Development of RMD ecosystem contracts
            </div>
          </div>
        </motion.div>
        <motion.div
          key="stage4"
          initial={{ translateX: "1000" }}
          transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
          whileInView={{ translateX: 0 }}
          className="md:-mt-20 w-full flex justify-end"
        >
          <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
            <div className="text-slate-100 text-5xl text-center font-bold">
              Stage <span className="text-green-400">4</span>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Start of ███ public sale
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              ███ Marketing
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Release of ███ ████████ system
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Influencers collaborations
            </div>
          </div>
        </motion.div>
        <motion.div
          key="stage5"
          initial={{ translateX: "-1000" }}
          transition={{ duration: 1, ease: "backInOut" }}
          whileInView={{ translateX: 0 }}
          className="md:-mt-20 w-full flex justify-start"
        >
          <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
            <div className="text-green-400 text-5xl text-center font-bold">
              Stage <span className="text-slate-100">5</span>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              ███ expansion to even more █████
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Potential ███ ugrades to receive ███████████ in ███ ██████
            </div>
            <div className="mt-2 flex gap-4 items-center">
              <GiTireIronCross size={20} className="text-slate-100" />
              Release of ecosystem details
            </div>
          </div>
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
