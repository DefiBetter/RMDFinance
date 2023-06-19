import { motion } from "framer-motion";

export default function BackgroundLines() {
  return (
    <>
      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "200vh" }}
        className="z-10 absolute left-[calc(25%-15px)] top-0 w-[1.5px] bg-slate-100/5  bg-gradient-to-b from-slate-100/10 to-transparent opacity-50"
      />
      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "200vh" }}
        className="z-10 absolute left-1/2 top-0 w-[1.5px] bg-slate-100/5 h-full bg-gradient-to-b from-slate-100/10 to-transparent opacity-50"
      />
      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "200vh" }}
        className="z-10 absolute left-[calc(75%-15px)] top-0 w-[1.5px] bg-slate-100/10 h-full bg-gradient-to-b from-slate-100/10 to-transparent opacity-50"
      />

      <motion.div
        initial={{ height: 0 }}
        transition={{ delay: 1, duration: 2, ease: [0.42, 0, 0.58, 1] }}
        animate={{ height: "200vh" }}
        className='absolute -bottom-[130vh] m-auto w-[calc(100vw-4rem)] h-2 border-[1.5px] border-slate-100/30 rounded-full z-10' />
    </>
  );
}
