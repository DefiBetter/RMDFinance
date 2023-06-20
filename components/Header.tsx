import { BsDiscord, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/statics/images/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <nav className="fixed left-0 z-50 top-7 w-full flex flex-col md:flex-row justify-start px-7">
      <div className="absolute -top-2 left-5 w-7 h-7 border-l-2 border-t-2 border-slate-100/20" />
      <div className="absolute -bottom-2 right-5 w-7 h-7 border-r-2 border-b-2 border-slate-100/20" />
      <motion.div
        initial={{
          opacity: 0.5,
          width: 0,
        }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] }}
        className="group w-full flex h-16 bg-gradient-to-r from-slate-100/5 to-slate-100/10 items-center backdrop-blur-md"
      >
        <div className=" w-16 h-full">
          <motion.div
            initial={{
              width: "10%",
            }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 2, ease: [0.42, 0, 0.58, 1] }}
            className="w-full h-full bg-slate-100/50 flex justify-center items-center"
          >
            <Image src={logo} alt="logo" className="p-1" />
          </motion.div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease: "linear" }}
          className="font-mponderosa px-5 text-4xl"
        >
          R
          <span className="opacity-0 group-hover:opacity-100 transition-all">
            E
          </span>
          M
          <span className="opacity-0 group-hover:opacity-100 transition-all">
            E
          </span>
          D
          <span className="opacity-0 group-hover:opacity-100 transition-all">
            Y
          </span>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{ opacity: 1, height: "4rem" }}
        transition={{ delay: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] }}
        className="w-full flex h-16 backdrop-blur-md"
      >
        <div className="flex h-full w-full">
          <div className="group cursor-pointer relative w-3/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
            <div className="z-10">ABOUT</div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              COMING SOON
            </div>
          </div>
          <a
            href="https://discord.gg/hYSGAXhsXw"
            target="_blank"
            className="group cursor-pointer relative w-1/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500"
          >
            <div className="z-10">
              <BsDiscord size={23} />
            </div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              002
            </div>
          </a>
        </div>
        <div className="flex h-full w-full">
          <a
            href="https://twitter.com/RMDeFinance"
            target="_blank"
            className="group cursor-pointer relative w-1/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500"
          >
            <div className="z-10">
              <BsTwitter size={23} />
            </div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              003
            </div>
          </a>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div className="group cursor-pointer relative w-3/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
                  <div
                    className="z-10 h-full w-full flex justify-center items-center"
                    {...(!ready && {
                      "aria-hidden": true,
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full h-full"
                          >
                            CONNECT WALLET
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            className="w-full h-full bg-red-100/20"
                            onClick={openChainModal}
                            type="button"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div
                          onClick={openAccountModal}
                          className="w-full h-full flex items-center justify-center gap-3"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 20, height: 20 }}
                                />
                              )}
                            </div>
                          )}

                          <div>
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ""}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
                  <div className="absolute bottom-1 left-1 text-xs text-slate-500">
                    004
                  </div>
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </motion.div>
    </nav>
  );
}
