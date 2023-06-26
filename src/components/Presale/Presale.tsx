"use client";
import lines from "@/src/statics/images/lines.svg";
import Image from "next/image";
import { GiBuyCard, GiWallet, GiFizzingFlask } from "react-icons/gi";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { ContractKey, contracts } from "../../statics/contract";
import useAllowance from "../../hooks/useAllowance";
import useApprove from "../../hooks/useApprove";
import useBuy from "../../hooks/useBuy";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const BUY_WITH_NATIVE = 0;
const BUY_WITH_RMD = 1;

export default function Presale({
  rmdPrice,
  bnbPrice,
  chainId,
  nativeSymbol,
  nativeBalance,
  rmdBalance,
  rmdBalanceFormatted,
  totalRaised,
}: {
  rmdPrice: string;
  bnbPrice: string;
  chainId: ContractKey;
  nativeSymbol: string;
  nativeBalance: string;
  rmdBalance: bigint;
  rmdBalanceFormatted: string;
  totalRaised: number;
}) {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [mode, setMode] = useState(BUY_WITH_NATIVE);
  const [valueA, setValueA] = useState<string>("");

  const tokenIn =
    mode === BUY_WITH_NATIVE
      ? contracts[chainId].wbnb.address
      : contracts[chainId].rmd.address;

  const amountIn = parseEther(valueA as `${number}`);
  const amountOut = BigInt("0"); //useGetAmountsOut(amountIn, [tokenIn, tokenOut]);

  const allowance = useAllowance(tokenIn, contracts[chainId].rmdv2.address);
  const formattedAmountOut = Number(formatEther(amountOut as bigint)).toFixed(
    5
  );

  const priceIn = (
    mode === BUY_WITH_NATIVE
      ? Number(valueA) * Number(bnbPrice)
      : Number(valueA) * Number(rmdPrice)
  ).toFixed(2);
  const priceOut = (
    mode === BUY_WITH_NATIVE
      ? Number(formattedAmountOut) * Number(rmdPrice)
      : Number(formattedAmountOut) * Number(bnbPrice)
  ).toFixed(2);

  const approveTX = useApprove(amountIn);
  const buyTX = useBuy(amountIn, tokenIn);

  function swapAssets() {
    setMode(mode === BUY_WITH_NATIVE ? BUY_WITH_RMD : BUY_WITH_NATIVE);
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
    <div className="m-auto w-full md:w-1/3 backdrop-blur-md bg-slate-100/20">
      <h2 className="uppercase h-14 w-full relative text-3xl text-center flex items-center justify-center">
        <Image
          src={lines}
          alt="lines"
          className="absolute left-0 top-0 w-full h-full -scale-x-100"
        />
        <div className="z-10 flex items-center gap-5">
          PRESALE RMDv2 <GiBuyCard size={30} className="text-green-400" />
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
        <div className="mt-5 w-full flex bg-slate-100/20 items-center h-16 px-3 gap-5">
          <input
            value={valueA}
            onChange={(e) => setValueA(e.target.value)}
            type="number"
            placeholder="0.00"
            className="text-slate-100 w-full outline-none bg-transparent text-xl"
          />
          <div>${priceIn}</div>
          <div
            onClick={() => {
              if (mode === BUY_WITH_NATIVE && nativeBalance) {
                setValueA((Number(nativeBalance) - 0.001).toString());
              } else if (mode === BUY_WITH_RMD && rmdBalance) {
                setValueA(formatEther(rmdBalance));
              }
            }}
            className="group cursor-pointer relative whitespace-nowrap gap-2 px-2 flex items-center border-[1px] border-slate-100/20 h-10 hover:text-black transition-colors duration-500"
          >
            <div className="z-10 flex gap-2 items-center">
              {mode === BUY_WITH_NATIVE ? (
                <span>
                  {nativeBalance ? Number(nativeBalance).toFixed(4) : 0}{" "}
                  {nativeSymbol}
                </span>
              ) : (
                <span>
                  {" "}
                  {rmdBalance ? Number(rmdBalanceFormatted).toFixed(4) : 0}{" "}
                  RMDv2
                </span>
              )}

              <GiWallet size={18} />
            </div>
            <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </div>
        </div>

        <div className="mt-2 w-full flex bg-slate-100/5 items-center h-16 px-3">
          <div className="flex gap-2 items-center w-full text-slate-100 text-xl">
            <div>{formattedAmountOut ? formattedAmountOut : "0.00"}</div>
          </div>
          <div>{mode === BUY_WITH_NATIVE ? "RMDv2" : nativeSymbol}</div>
        </div>

        {/* Approve */}
        {!address ? (
          <button
            onClick={openConnectModal}
            className="mt-5 group disabled:cursor-not-allowed relative w-full flex justify-center items-center border-[1px] border-slate-100/20 bg-slate-200/30 h-16 hover:text-black transition-colors duration-500"
          >
            <div className="z-10">
              <span>CONNECT WALLET</span>
            </div>
            <div className="z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </button>
        ) : mode === BUY_WITH_RMD &&
          Number(formatEther(allowance)) < Number(valueA) ? (
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
            disabled={!buyTX.transaction.write || !valueA}
            onClick={() => {
              if (buyTX.transaction.write) {
                buyTX.transaction.write();
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
