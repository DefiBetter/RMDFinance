"use client";
import lines from "@/src/statics/images/lines.svg";
import Image from "next/image";
import { RiUserStarFill } from "react-icons/ri";
import { AiFillCopy } from "react-icons/ai";
import {
  GiUpgrade,
  GiReceiveMoney,
  GiSuperMushroom,
  GiPotionBall,
  GiFizzingFlask,
  GiIciclesAura,
} from "react-icons/gi";
import { useAccount } from "wagmi";

export default function ReferralProgram() {
  const { address } = useAccount();
  
  return (
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
  );
}
