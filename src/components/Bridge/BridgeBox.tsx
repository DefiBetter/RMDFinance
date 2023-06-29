"use client";
import lines from "@/src/statics/images/lines.svg";
import Image from "next/image";
import {
  GiWallet,
  GiFizzingFlask,
  GiBridge,
  GiCableStayedBridge,
} from "react-icons/gi";
import { useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import { ARB, BSC, ChainId, ETH } from "../../statics/contract";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import ethLogo from "@/src/statics/images/eth-logo.svg";
import arbLogo from "@/src/statics/images/arb-logo.svg";
import bscLogo from "@/src/statics/images/bnb-logo.svg";
import useBridge from "@/src/hooks/useBridge";
import { useSwitchNetwork } from "wagmi";

export default function BridgeBox({
  chainId,
  address,
  rmdBalance,
  rmdBalanceFormatted,
  rmdPrice,
}: {
  chainId: ChainId;
  address: string;
  rmdBalance: bigint;
  rmdBalanceFormatted: string;
  rmdPrice: number | null;
}) {
  const { switchNetwork } = useSwitchNetwork();
  const { openConnectModal } = useConnectModal();
  const [valueA, setValueA] = useState<string>("");
  const [destinationChain, setDestinationChain] = useState<ChainId | null>(
    null
  );

  const amountIn = useMemo(() => parseEther(valueA as `${number}`), [valueA]);
  const priceIn = useMemo(
    () => (Number(valueA) * Number(rmdPrice)).toFixed(2),
    [valueA, rmdPrice]
  );

  const bridgeTX = useBridge(BigInt("0"), amountIn, chainId, destinationChain as ChainId);

  function getButtonText() {
    if (bridgeTX.confirmation.isLoading) {
      return (
        <span className="flex gap-3 items-center font-bold">
          BRIDGING ...
          <GiFizzingFlask size={30} className="flask-loading" />
        </span>
      );
    }
    return <span>BRIDGE {valueA} RMDv2</span>;
  }

  return (
    <div className="w-full max-w-[500px] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 shadow-lg rounded-md">
      <h2 className="uppercase h-14 w-full relative text-xl md:text-3xl text-center flex items-center justify-center">
        <Image
          src={lines}
          alt="lines"
          className="absolute left-0 top-0 w-full h-full -scale-x-100"
        />
        <div className="relative z-10 flex items-center gap-5">
          <div className="whitespace-nowrap">BRDIGE RMDv2</div>
          <GiCableStayedBridge size={30} />
        </div>
      </h2>
      <div className="w-full p-5">
        <div className="w-full flex">
          <div className="w-full">
            <div>From</div>
            <div className="w-full flex gap-2">
              <button
                onClick={() => (switchNetwork ? switchNetwork(ETH) : null)}
                className={`relative ${
                  chainId === ETH ? "bg-green-400/80" : "bg-slate-100/20"
                } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
              >
                <Image
                  src={ethLogo}
                  alt="ETH"
                  className="h-full aspect-square"
                />
              </button>
              <button
                onClick={() => (switchNetwork ? switchNetwork(ARB) : null)}
                className={`relative ${
                  chainId === ARB ? "bg-green-400/80" : "bg-slate-100/20"
                } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
              >
                <div className="z-10">
                  <Image
                    src={arbLogo}
                    alt="ARB"
                    className="h-full aspect-square"
                  />
                </div>
              </button>

              <button
                onClick={() => (switchNetwork ? switchNetwork(BSC) : null)}
                className={`relative ${
                  chainId === BSC ? "bg-green-400/80" : "bg-slate-100/20"
                } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
              >
                <div className="z-10">
                  <Image
                    src={bscLogo}
                    alt="BSC"
                    className="h-full aspect-square"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="text-right">To</div>
            <div className="w-full flex justify-end gap-2">
              {chainId !== ETH && (
                <button
                  onClick={() => setDestinationChain(ETH)}
                  className={`relative ${
                    destinationChain === ETH
                      ? "bg-green-400/80"
                      : "bg-slate-100/20"
                  } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
                >
                  <div className="z-10">
                    <Image
                      src={ethLogo}
                      alt="ETH"
                      className="h-full aspect-square"
                    />
                  </div>
                </button>
              )}

              {chainId !== ARB && (
                <button
                  onClick={() => setDestinationChain(ARB)}
                  className={`relative ${
                    destinationChain === ARB
                      ? "bg-green-400/80"
                      : "bg-slate-100/20"
                  } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
                >
                  <div className="z-10">
                    <Image
                      src={arbLogo}
                      alt="ARB"
                      className="h-full aspect-square"
                    />
                  </div>
                </button>
              )}

              {chainId !== BSC && (
                <button
                  onClick={() => setDestinationChain(BSC)}
                  className={`relative ${
                    destinationChain === BSC
                      ? "bg-green-400/80"
                      : "bg-slate-100/20"
                  } w-10 h-10 hover:bg-green-400 group cursor-pointer flex justify-center items-center hover:text-black transition-colors duration-500 rounded-md p-1`}
                >
                  <div className="z-10">
                    <Image
                      src={bscLogo}
                      alt="BSC"
                      className="h-full aspect-square"
                    />
                  </div>
                </button>
              )}
            </div>
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
            onClick={() => setValueA(formatEther(rmdBalance))}
            className="group cursor-pointer relative whitespace-nowrap gap-2 px-2 flex items-center outline outline-1 outline-slate-100/20 h-10 hover:text-black transition-colors duration-500  rounded-md"
          >
            <div className="z-10 flex gap-2 items-center">
              {rmdBalance ? Number(rmdBalanceFormatted).toFixed(4) : 0}
              <GiWallet size={18} />
            </div>
            <div className=" rounded-md z-0 group-hover:w-full bg-green-400 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </div>
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
        ) : (
          // Swap
          <button
            disabled={!bridgeTX.transaction.write || !valueA || !destinationChain}
            onClick={() => {
              if (bridgeTX.transaction.write) {
                bridgeTX.transaction.write();
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
