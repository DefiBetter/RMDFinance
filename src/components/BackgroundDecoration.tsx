import { motion } from "framer-motion";
import Image from "next/image";
import greenFlask from "@/src/statics/images/logo2.png";

export default function BackgroundDecoration() {

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-10 overflow-hidden">
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
      <video
        autoPlay
        muted
        loop
        className="top-0 left-0 object-cover w-screen h-screen opacity-30"
      >
        <source src={"/videos/smoke.mp4"} type="video/mp4" />
      </video>
    </div>
  );
}
