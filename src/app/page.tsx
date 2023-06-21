"use client";
import Header from "@/src/components/Header";
import backgroundPoster from "@/src/statics/images/poster.jpg";
import BackgroundLines from "@/src/components/BackgroundLines";
import { motion } from "framer-motion";
import useSWR from "swr";
import lines from "@/src/statics/images/lines.svg";
import Image from "next/image";
import { RiUserStarFill } from "react-icons/ri";
import { useAccount } from "wagmi";
import { AiFillCopy, AiOutlineSwap } from "react-icons/ai";
import {
  GiUpgrade,
  GiReceiveMoney,
  GiSuperMushroom,
  GiPotionBall,
  GiFizzingFlask,
  GiIciclesAura,
  GiBuyCard,
  GiWallet,
  GiSellCard,
} from "react-icons/gi";
import { useState } from "react";

const BUY = 0;
const SELL = 1;

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    `https://api.dexscreener.com/latest/dex/pairs/bsc/0x766d7ed89297cc97ffbc8101a78438b3d59ae087`,
    fetcher,
    { refreshInterval: 30000 }
  );
  const { address } = useAccount();
  const [mode, setMode] = useState(BUY);
  const [bnbAmount, setBnbAmount] = useState<string>("");
  const [rmmAmount, setRmmAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5");

  const userBalance = 90; //useUserBalance();
  const userRMMBalance = 5000; //useUserBalance();

  function swapAssets() {
    setMode(mode === BUY ? SELL : BUY);
  }

  return (
    <main className="flex items-stretch justify-center">
      <Header priceUSD={data?.pairs[0].priceUsd} />
      <BackgroundLines />

      <video
        poster={backgroundPoster.src}
        autoPlay
        muted
        loop
        className="object-cover w-screen h-screen fixed"
      >
        <source src={"/videos/back1.mp4"} type="video/mp4" />
      </video>

      {/* Screen height - Header height - header top spacing */}
      <section className="relative w-full px-7 flex items-stretch z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-48 w-full flex flex-col md:flex-row items-stretch"
        >
          <div className="w-full md:w-1/2 backdrop-blur-md bg-slate-100/20">
            <h2 className="uppercase h-14 w-full relative text-3xl text-center flex items-center justify-center gap-5">
              <Image
                src={lines}
                alt="lines"
                className="absolute left-0 top-0 w-full h-full -scale-x-100"
              />
              {mode === BUY ? (
                <>
                  BUY RMM <GiBuyCard size={30} />
                </>
              ) : (
                <>
                  SELL RMM <GiSellCard size={30} />
                </>
              )}
            </h2>
            <div className="w-full p-5">
              <div className="font-bold text-xl">
                ENTER {mode === BUY ? "BNB" : "RMM"}
              </div>
              <div className="w-full flex bg-slate-100/20 items-center h-16 px-3">
                <input
                  value={mode === BUY ? bnbAmount : rmmAmount}
                  onChange={(e) => {
                    if (mode === BUY) {
                      setBnbAmount(e.target.value);
                    } else {
                      setRmmAmount(e.target.value);
                    }
                  }}
                  type="number"
                  min={0}
                  max={userBalance | 999}
                  placeholder="0.00"
                  className="text-white w-full outline-none bg-transparent text-xl"
                />
                <div
                  onClick={() => {
                    if (mode === BUY) {
                      setBnbAmount((userBalance - 0.001).toString());
                    } else {
                      setRmmAmount(userRMMBalance.toString());
                    }
                  }}
                  className="group cursor-pointer relative whitespace-nowrap gap-2 px-2 flex items-center border-[1px] border-slate-100/20 h-10 hover:text-black transition-colors duration-500"
                >
                  <div className="z-10 flex gap-2 items-center">
                    {mode === BUY ? (
                      <span>{userBalance | 0} BNB</span>
                    ) : (
                      <span>{userRMMBalance | 0} RMM</span>
                    )}

                    <GiWallet size={18} />
                  </div>
                  <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
                </div>
              </div>
              <div
                onClick={swapAssets}
                className="mt-2 group m-auto cursor-pointer relative w-10 h-10 flex justify-center items-center border-[1px] border-slate-100/20 hover:text-black transition-colors duration-500"
              >
                <AiOutlineSwap size={23} className="z-10 rotate-90" />
                <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
              </div>
              <div className="mt-2 w-full flex bg-slate-100/5 items-center h-16 px-3">
                <input
                  value={mode === BUY ? rmmAmount : bnbAmount}
                  disabled
                  placeholder="0.00"
                  className="text-white w-full outline-none bg-transparent text-xl"
                />
              </div>
              <div className="mt-5 w-full flex justify-between">
                <div className="text-left w-1/3">
                  <div className="font-bold">Price Info</div>
                  <div className="">1 BNB = 6969 RMM</div>
                </div>
                <div className="text-center w-1/3">
                  <div className="font-bold">Price Impact</div>
                  <div className="">6.9%</div>
                </div>
                <div className="text-right flex flex-col justify-end items-end w-1/3">
                  <div className="font-bold">Slippage</div>
                  <div className="flex bg-slate-100/20 items-center w-20 h-6 px-3">
                    <input
                      value={slippage}
                      onChange={(e) => {
                        setSlippage(e.target.value);
                      }}
                      type="number"
                      min={0}
                      max={100}
                      placeholder="0.5"
                      className="text-white w-full outline-none bg-transparent"
                    />
                    %
                  </div>
                </div>
              </div>

              <div className="mt-5 group cursor-pointer relative w-full flex justify-center items-center border-[1px] border-slate-100/20 bg-slate-200/30 h-16 hover:text-black transition-colors duration-500">
                <div className="z-10">
                  SWAP {mode === BUY ? `${bnbAmount} BNB` : `${rmmAmount} RMM`}{" "}
                  to {mode === BUY ? `${rmmAmount} RMM` : `${bnbAmount} BNB`}
                </div>
                <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 backdrop-blur-md bg-slate-100/10">
            <h2 className="uppercase h-14 w-full relative text-3xl text-center flex items-center justify-center gap-5">
              <Image
                src={lines}
                alt="lines"
                className="absolute left-0 top-0 w-full h-full"
              />
              Referral Program <RiUserStarFill size={30} />
            </h2>
            <div className="p-5 text-center">
              <div className="flex gap-2 items-center justify-center">
                Buy to level up your tier
                <GiUpgrade size={20} />
              </div>
              <div className="flex gap-2 items-center justify-center">
                Refer friends to receive a % of their buys
                <GiReceiveMoney size={20} />
              </div>

              <div className=" mt-5 flex items-center justify-between gap-5 flex-wrap">
                <div className="cursor-pointer w-32 border-[1px] border-slate-100/5 p-2 relative bg-slate-100/5 gap-2">
                  <div className="font-bold text-xl flex justify-center items-center gap-2">
                    5%
                    <GiSuperMushroom size={20} />
                  </div>
                  <div className="text-xs">500 RMM</div>
                </div>
                <div className="cursor-pointer w-32 border-[1px] border-slate-100/10 p-2 relative bg-slate-100/5 gap-2">
                  <div className="font-bold text-xl flex justify-center items-center gap-2">
                    10%
                    <GiPotionBall size={20} />
                  </div>
                  <div className="text-xs">500 RMM</div>
                </div>
                <div className="cursor-pointer w-32 border-[1px] border-slate-100/25 p-2 relative bg-slate-100/5 gap-2">
                  <div className="font-bold text-xl flex justify-center items-center gap-2">
                    15%
                    <GiFizzingFlask size={20} />
                  </div>
                  <div className="text-xs">500 RMM</div>
                </div>
                <div className="cursor-pointer w-32 border-[1px] border-slate-100/40 p-2 relative bg-slate-100/5 gap-2">
                  <div className="font-bold text-xl flex justify-center items-center gap-2">
                    25%
                    <GiIciclesAura size={20} />
                  </div>
                  <div className="text-xs">500 RMM</div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="text-left w-1/3">
                  <div className="font-bold">Your Balance</div>
                  <div className="">5,241.21 RMM</div>
                </div>
                <div className="w-1/3">
                  <div className="font-bold">Raised via Referral</div>
                  <div className="">1.443 BNB</div>
                </div>
                <div className="text-right w-1/3">
                  <div className="font-bold">Profit from Raised</div>
                  <div className="">0.145 BNB</div>
                </div>
              </div>
              <div className="mt-5 group cursor-pointer relative w-full flex justify-center items-center border-[1px] border-slate-100/20 bg-slate-200/30 h-16 hover:text-black transition-colors duration-500">
                <div className="z-10">CLAIM REWARDS</div>
                <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
                <div className="absolute bottom-1 right-2 text-xs text-slate-200 group-hover:text-slate-500 transition-colors">
                  0.1235 BNB ($123.21)
                </div>
              </div>
              <div className="mt-5 cursor-pointer text-center w-full flex justify-between">
                <div>Click to copy your Referral link</div>
                <div className="flex gap-2">
                  ..?ref={`${address?.slice(0, 5)}...${address?.slice(-5)}`}
                  <AiFillCopy size={20} />
                </div>
              </div>
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
