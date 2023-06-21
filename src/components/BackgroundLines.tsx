import { motion } from "framer-motion";

export default function BackgroundLines() {
  return (
    <div className="h-full z-10">
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
