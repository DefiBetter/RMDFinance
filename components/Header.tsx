import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
import { BsDiscord, BsTwitch, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <nav className="fixed left-0 z-50 top-7 w-full flex justify-start px-7">
      <div className="absolute -top-2 left-5 w-7 h-7 border-l-2 border-t-2 border-slate-100/20" />
      <div className="absolute -bottom-2 right-5 w-7 h-7 border-r-2 border-b-2 border-slate-100/20" />
      <motion.div
        initial={{
          opacity: 0.5,
          width: 0,
        }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] }}
        className="w-full flex h-16 bg-gradient-to-r from-slate-100/5 to-slate-100/10 items-center backdrop-blur-md"
      >
        <div className="w-16 h-full">
          <motion.div
            initial={{
              width: "10%",
            }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 2, ease: [0.42, 0, 0.58, 1] }}
            className="w-full h-full bg-slate-100 flex justify-center items-center"
          >
            <div className="w-1/4 h-1/4 bg-black rotate-45" />
          </motion.div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease: "linear" }}
          className="px-5 font-aquire text-2xl pt-1"
        >
          Fates
        </motion.div>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{ opacity: 1, height: '4rem' }}
        transition={{ delay: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] }}
        className="w-full flex h-16 backdrop-blur-md"
      >
        <div className="flex h-full w-full">
          <div className="group cursor-pointer relative w-3/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
            <div className="z-10">ABOUT</div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              001
            </div>
          </div>
          <div className="group cursor-pointer relative w-1/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
            <div className="z-10">
              <BsDiscord size={23} />
            </div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              002
            </div>
          </div>
        </div>
        <div className="flex h-full w-full">
          <div className="group cursor-pointer relative w-1/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
            <div className="z-10">
              <BsTwitter size={23} />
            </div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              003
            </div>
          </div>
          <div className="group cursor-pointer relative w-3/4 flex justify-center items-center border-[1px] border-slate-100/20 h-full hover:text-black transition-colors duration-500">
            <div className="z-10">CONNECT WALLET</div>
            <div className="z-0 group-hover:w-full bg-slate-100 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
            <div className="absolute bottom-1 left-1 text-xs text-slate-500">
              004
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
