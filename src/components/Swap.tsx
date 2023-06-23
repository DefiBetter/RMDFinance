"use client";
import lines from "@/src/statics/images/lines.svg";
import Image from "next/image";
import { AiOutlineSwap } from "react-icons/ai";
import {
  GiBuyCard,
  GiWallet,
  GiSellCard,
  GiFizzingFlask,
} from "react-icons/gi";
import { createRef, useRef, useState } from "react";
import useGetAmountsOut from "../hooks/useGetAmountsOut";
import { formatEther, parseEther } from "viem";
import useSwap from "../hooks/useSwap";
import { contracts } from "../statics/contract";
import useAllowance from "../hooks/useAllowance";
import useTokenBalance from "../hooks/useTokenBalance";
import useApprove from "../hooks/useApprove";

const BUY = 0;
const SELL = 1;

export default function Swap({
  rmdPrice,
  bnbPrice,
}: {
  rmdPrice: string;
  bnbPrice: string;
}) {
  const [mode, setMode] = useState(BUY);
  const [valueA, setValueA] = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5");

  const tokenIn =
    mode === BUY ? contracts[56].wbnb.address : contracts[56].rmd.address;
  const tokenOut =
    mode === BUY ? contracts[56].rmd.address : contracts[56].wbnb.address;

  const amountIn = parseEther(valueA as `${number}`);
  const amountOut = useGetAmountsOut(amountIn, [tokenIn, tokenOut]);
  const allowance = useAllowance();
  const nativeBalance = useTokenBalance(undefined);
  const rmdBalance = useTokenBalance(contracts[56].rmd.address);

  const formattedAmountOut = Number(formatEther(amountOut as bigint)).toFixed(
    5
  );

  const priceIn = (
    mode === BUY
      ? Number(valueA) * Number(bnbPrice)
      : Number(valueA) * Number(rmdPrice)
  ).toFixed(2);
  const priceOut = (
    mode === BUY
      ? Number(formattedAmountOut) * Number(rmdPrice)
      : Number(formattedAmountOut) * Number(bnbPrice)
  ).toFixed(2);
  const priceImpact = 100 - (Number(priceOut) * 100) / Number(priceIn);

  const slippagePercent = 1 - Number(slippage) / 10;

  const minAmountOut = Number(formatEther(amountOut)) * slippagePercent;

  const approveTX = useApprove(amountIn);
  const swapTX = useSwap(
    amountIn,
    tokenIn,
    tokenOut,
    parseEther(`${minAmountOut}`)
  );

  function swapAssets() {
    setMode(mode === BUY ? SELL : BUY);
  }

  function getButtonText() {
    if (swapTX.confirmation.isLoading) {
      return (
        <span className="flex gap-3 items-center font-bold">
          SWAPPING ...
          <GiFizzingFlask size={30} className="flask-loading" />
        </span>
      );
    }
    return (
      <span>
        SWAP {Number(valueA).toFixed(5)} {mode === BUY ? `BNB` : `RMD`} to{" "}
        {formattedAmountOut} {mode === BUY ? `RMD` : `BNB`}
      </span>
    );
  }

  return (
    <div className="w-full md:w-1/3 backdrop-blur-md bg-slate-100/20">
      <h2 className="uppercase h-14 w-full relative text-3xl text-center flex items-center justify-center">
        <Image
          src={lines}
          alt="lines"
          className="absolute left-0 top-0 w-full h-full -scale-x-100"
        />
        <div className="z-10 flex items-center gap-5">
          {mode === BUY ? (
            <>
              BUY RMD <GiBuyCard size={30} className="text-green-400" />
            </>
          ) : (
            <>
              SELL RMD <GiSellCard size={30} className="text-red-400" />
            </>
          )}
        </div>
      </h2>
      <div className="w-full p-5">
        <div className="w-full flex bg-slate-100/20 items-center h-16 px-3 gap-5">
          <input
            value={valueA}
            onChange={(e) => setValueA(e.target.value)}
            type="number"
            min={0}
            max={nativeBalance ? Number(nativeBalance.formatted) : 999}
            placeholder="0.00"
            className="text-slate-100 w-full outline-none bg-transparent text-xl"
          />
          <div>${priceIn}</div>
          <div
            onClick={() => {
              if (mode === BUY && nativeBalance) {
                setValueA((Number(nativeBalance.formatted) - 0.001).toString());
              } else if (mode === SELL && rmdBalance) {
                setValueA(formatEther(rmdBalance.value));
              }
            }}
            className="group cursor-pointer relative whitespace-nowrap gap-2 px-2 flex items-center border-[1px] border-slate-100/20 h-10 hover:text-black transition-colors duration-500"
          >
            <div className="z-10 flex gap-2 items-center">
              {mode === BUY ? (
                <span>
                  {nativeBalance
                    ? Number(nativeBalance.formatted).toFixed(4)
                    : 0}{" "}
                  BNB
                </span>
              ) : (
                <span>
                  {" "}
                  {rmdBalance ? Number(rmdBalance.formatted).toFixed(4) : 0} RMD
                </span>
              )}

              <GiWallet size={18} />
            </div>
            <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </div>
        </div>
        <div
          onClick={swapAssets}
          className="mt-2 group m-auto cursor-pointer relative w-10 h-10 flex justify-center items-center border-[1px] border-slate-100/20 hover:text-black transition-colors duration-500"
        >
          <AiOutlineSwap size={23} className="z-10 rotate-90" />
          <div className="z-0 group-hover:w-full bg--400 absolute bg-green-400 bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
        </div>
        <div className="mt-2 w-full flex bg-slate-100/5 items-center h-16 px-3">
          <div className="flex gap-2 items-center w-full text-slate-100 text-xl">
            <div>{formattedAmountOut ? formattedAmountOut : "0.00"}</div>
            {mode === BUY ? "RMD" : "BNB"}
          </div>
          <div>${priceOut}</div>
        </div>
        <div className="mt-5 w-full flex justify-between">
          <div className="text-left w-1/2">
            <div className="font-bold">Price Impact</div>
            <div className="">
              {priceImpact && priceImpact > 0 ? priceImpact.toFixed(2) : "0.00"}
              %
            </div>
          </div>
          <div className="text-right flex flex-col justify-end items-end w-1/2">
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
                className="text-slate-100 w-full outline-none bg-transparent"
              />
              %
            </div>
          </div>
        </div>

        {/* Approve */}
        {mode === SELL && Number(formatEther(allowance)) < Number(valueA) ? (
          <button
            disabled={!approveTX.transaction.write}
            onClick={() => {
              if (approveTX.transaction.write) {
                approveTX.transaction.write();
              }
            }}
            className="mt-5 group disabled:cursor-not-allowed relative w-full flex justify-center items-center border-[1px] border-slate-100/20 bg-slate-200/30 h-16 hover:text-black transition-colors duration-500"
          >
            <div className="z-10">
              {approveTX.confirmation.isLoading ? (
                <span className="flex gap-3 items-center font-bold">
                  APPROVING ...
                  <GiFizzingFlask size={30} className="flask-loading" />
                </span>
              ) : (
                <span>APPROVE RMD</span>
              )}
            </div>
            <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </button>
        ) : (
          // Swap
          <button
            disabled={!swapTX.transaction.write || !valueA}
            onClick={() => {
              if (swapTX.transaction.write) {
                swapTX.transaction.write();
              }
            }}
            className="mt-5 group disabled:cursor-not-allowed relative w-full flex justify-center items-center border-[1px] border-slate-100/20 bg-slate-200/30 h-16 hover:text-black transition-colors duration-500"
          >
            <div className="z-10">{getButtonText()}</div>
            <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </button>
        )}
      </div>
    </div>
  );
}
