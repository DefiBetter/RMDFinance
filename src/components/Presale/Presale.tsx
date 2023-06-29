"use client";
import lines from "@/src/statics/images/lines.svg";
import Image from "next/image";
import { GiBuyCard, GiWallet, GiFizzingFlask } from "react-icons/gi";
import { useMemo, useState } from "react";
import { Address, formatEther, parseEther } from "viem";
import { BSC, ChainId, contracts } from "../../statics/contract";
import useAllowance from "../../hooks/useAllowance";
import useApprove from "../../hooks/useApprove";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import useBuyPresale from "@/src/hooks/useBuyPresale";
import usdc from "@/src/statics/images/USDC.png";
import rmd from "@/src/statics/images/logo.png";

const BUY_WITH_USDC = 0;
const BUY_WITH_RMD = 1;

export default function Presale({
  rmdPrice,
  usdcPrice,
  chainId,
  address,
  usdcBalance,
  rmdBalance,
  rmdBalanceFormatted,
  totalRaised,
}: {
  rmdPrice: Number | null;
  usdcPrice: Number | null;
  chainId: ChainId;
  address: string;
  usdcBalance: string;
  rmdBalance: bigint;
  rmdBalanceFormatted: string;
  totalRaised: number;
}) {
  const { openConnectModal } = useConnectModal();
  const [mode, setMode] = useState(BUY_WITH_USDC);
  const [valueA, setValueA] = useState<string>("");

  const tokenIn = useMemo(
    () =>
      mode === BUY_WITH_USDC
        ? contracts[chainId].usdc.address
        : contracts[chainId].rmd.address,
    [mode, chainId]
  );
  const amountIn = useMemo(() => parseEther(valueA as `${number}`), [valueA]);
  const priceIn = useMemo(
    () =>
      (mode === BUY_WITH_USDC
        ? Number(valueA) * Number(usdcPrice)
        : Number(valueA) * Number(rmdPrice)
      ).toFixed(2),
    [mode, valueA, usdcPrice, rmdPrice]
  );

  const amountOut = BigInt("0"); //useGetAmountsOut(amountIn, [tokenIn, tokenOut]);
  const formattedAmountOut = useMemo(
    () => Number(formatEther(amountOut as bigint)).toFixed(5),
    [amountOut]
  );
  const priceOut = (
    mode === BUY_WITH_USDC
      ? Number(formattedAmountOut) * Number(usdcPrice)
      : Number(formattedAmountOut) * Number(rmdPrice)
  ).toFixed(2);

  const allowance = useAllowance(
    tokenIn as Address,
    contracts[chainId].rmdv2.address as Address
  );
  const approveTX = useApprove(
    amountIn,
    tokenIn as Address,
    contracts[chainId].rmdv2.address as Address
  );
  const buyTX = useBuyPresale(tokenIn, amountIn);

  function swapAssets() {
    setMode(mode === BUY_WITH_USDC ? BUY_WITH_RMD : BUY_WITH_USDC);
  }

  function getButtonText() {
    if (buyTX.confirmation.isLoading) {
      return (
        <span className="flex gap-3 items-center font-bold">
          BUYING ...
          <GiFizzingFlask size={30} className="flask-loading" />
        </span>
      );
    }
    return <span>BUY {formattedAmountOut} RMDv2</span>;
  }

  return (
    <div className="w-full backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 shadow-lg rounded-md">
      <h2 className="uppercase h-14 w-full relative text-xl md:text-3xl text-center flex items-center justify-center">
        <Image
          src={lines}
          alt="lines"
          className="absolute left-0 top-0 w-full h-full -scale-x-100"
        />
        <div className="relative z-10 flex items-center gap-5">
          <div className="whitespace-nowrap">PRESALE RMDv2</div>

          <div className="w-full flex justify-center gap-2">
            <button
              onClick={() => setMode(BUY_WITH_USDC)}
              className={`relative ${
                mode === BUY_WITH_USDC ? "bg-green-400/80" : "bg-slate-300"
              } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
            >
              <div className="z-10">
                <Image src={usdc} alt="usdc" />
              </div>
            </button>
            {chainId === BSC && (
              <button
                onClick={() => setMode(BUY_WITH_RMD)}
                className={`relative ${
                  mode === BUY_WITH_RMD ? "bg-green-400/80" : "bg-slate-300"
                } w-10 h-10 group hover:bg-green-400 cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
              >
                <div className="z-10">
                  <Image src={rmd} alt="usdc" />
                </div>
              </button>
            )}
          </div>
        </div>
      </h2>
      <div className="w-full p-5">
        <div className="w-full flex justify-between">
          <div className="flex flex-col text-left">
            <div className="">Total Raised</div>
            <div className="font-bold">${totalRaised}</div>
          </div>
          <div className="flex flex-col text-right">
            <div className="">Remaining Supply</div>
            <div className="font-bold">655,134 RMDv2</div>
          </div>
        </div>
        <div className="mt-5 w-full flex bg-slate-100/20 items-center h-16 px-3 gap-2 rounded-md">
          <input
            value={valueA}
            onChange={(e) => setValueA(e.target.value)}
            type="number"
            placeholder="0.00"
            className="text-slate-100 w-full outline-none bg-transparent"
          />
          <div>${priceIn}</div>
          <div
            onClick={() => {
              if (mode === BUY_WITH_USDC && usdcBalance) {
                setValueA((Number(usdcBalance) - 0.001).toString());
              } else if (mode === BUY_WITH_RMD && rmdBalance) {
                setValueA(formatEther(rmdBalance));
              }
            }}
            className="group cursor-pointer relative whitespace-nowrap gap-2 px-2 flex items-center outline outline-1 outline-slate-100/20 h-10 hover:text-black transition-colors duration-500  rounded-md"
          >
            <div className="z-10 flex gap-2 items-center">
              {mode === BUY_WITH_USDC ? (
                <span>{usdcBalance && Number(usdcBalance) ? Number(usdcBalance).toFixed(4) : 0}</span>
              ) : (
                <span>
                  {rmdBalance ? Number(rmdBalanceFormatted).toFixed(4) : 0}
                </span>
              )}

              <GiWallet size={18} />
            </div>
            <div className=" rounded-md z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </div>
        </div>

        <div className="mt-2 w-full flex bg-slate-100/5 items-center h-16 px-3 rounded-md">
          <div className="flex gap-2 items-center w-full text-slate-100">
            <div>{formattedAmountOut ? formattedAmountOut : "0.00"}</div>
          </div>
          <div>RMDv2</div>
        </div>

        {/* Approve */}
        {!address ? (
          <button
            onClick={openConnectModal}
            className="rounded-md mt-5 group disabled:cursor-not-allowed relative w-full flex justify-center items-center bg-slate-200/30 h-16 hover:text-black transition-colors duration-500"
          >
            <div className="z-10">
              <span>CONNECT WALLET</span>
            </div>
            <div className=" rounded-md z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </button>
        ) : Number(formatEther(allowance)) < Number(valueA) ? (
          <button
            disabled={!approveTX.transaction.write}
            onClick={() => {
              if (approveTX.transaction.write) {
                approveTX.transaction.write();
              }
            }}
            className="rounded-md mt-5 group disabled:cursor-not-allowed relative w-full flex justify-center items-center bg-slate-200/30 h-16 hover:text-black transition-colors duration-500"
          >
            <div className="z-10">
              {approveTX.confirmation.isLoading ? (
                <span className="flex gap-3 items-center font-bold">
                  APPROVING ...
                  <GiFizzingFlask size={30} className="flask-loading" />
                </span>
              ) : (
                <span>APPROVE</span>
              )}
            </div>
            <div className="rounded-md z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </button>
        ) : (
          // Swap
          <button
            disabled={!buyTX.transaction.write || !valueA}
            onClick={() => {
              if (buyTX.transaction.write) {
                buyTX.transaction.write();
              }
            }}
            className="rounded-md mt-5 group disabled:cursor-not-allowed relative w-full flex justify-center items-center bg-slate-200/30 h-16 hover:text-black transition-colors duration-500"
          >
            <div className="z-10">{getButtonText()}</div>
            <div className="rounded-md z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </button>
        )}
      </div>
    </div>
  );
}
