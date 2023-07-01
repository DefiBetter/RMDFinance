"use client";
import { motion } from "framer-motion";
import useChain from "../../hooks/useChain";
import useTokenBalance from "../../hooks/useTokenBalance";
import { Address, useAccount } from "wagmi";
import { useWeb2Context } from "../../contexts/web2Context";
import BridgeBox from "@/src/components/Bridge/BridgeBox";
import { chains } from "@/src/statics/helpers/chains";

export default function Lab() {
  const chainId = useChain();
  const { address } = useAccount();
  const rmdBalance = useTokenBalance(chains[chainId].contracts.rmd.address);
  const web2Context = useWeb2Context();

  return (
    <>
      <section className="relative z-10 w-full px-4 md:px-7 flex flex-col md:flex-row justify-between md:justify-center items-center gap-10 md:gap-4 pb-16">
        <motion.div
          initial={{ translateX: "-1000px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center h-full mt-0 md:mt-16 w-full"
        >
          THE LAB
        </motion.div>
      </section>
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
