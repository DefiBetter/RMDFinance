import { motion } from "framer-motion";
import Image from "next/image";
import greenFlask from "@/src/statics/images/logo2.png";

export default function BackgroundLines() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-10 overflow-hidden ">
      {/* Top Right blurred effect */}
      <div className="animate-pulse absolute -top-16 -right-32 w-96 h-96 bg-green-400/40 rounded-full blur-3xl z-0" />

      <motion.div
        initial={{ transform: "translate(100px)" }}
        animate={{ transform: "translate(0px)" }}
        className="absolute -right-20 top-2/3 h-44 w-44 opacity-30 rotate-12 animate-wiggle"
      >
        <Image src={greenFlask} alt="flask" fill />
      </motion.div>

      <div className="remedy">REMEDY</div>

      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "100vh" }}
        className="z-10 absolute left-[calc(25%-14.5px)] top-0 w-[1.5px] bg-gradient-to-b from-slate-100/20 to-transparent"
      />
      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "100vh" }}
        className="z-10 absolute left-1/2 top-0 w-[1.5px] bg-slate-100/5 h-full bg-gradient-to-b from-slate-100/20 to-transparent"
      />

      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "100vh" }}
        className="z-10 absolute left-[calc(75%-14.5px)] top-0 w-[1.5px] h-full bg-gradient-to-b from-slate-100/20 to-transparent"
      />
    </div>
  );
}
