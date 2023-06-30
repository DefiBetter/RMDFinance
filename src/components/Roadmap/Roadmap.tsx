"use client";
import { motion } from "framer-motion";
import { GiCheckMark, GiTireIronCross } from "react-icons/gi";

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="relative z-10 w-full px-4 md:px-7 flex flex-col gap-10 md:gap-0 items-center py-16"
    >
      <h2 className="font-bold text-5xl md:text-7xl text-center">ROADMAP</h2>

      <motion.div
        key="stage1"
        initial={{ translateX: "-1000" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className="mt-5 w-full flex justify-start items-center"
      >
        <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4 shadow-lg">
          <div className="text-green-400 text-5xl text-center font-bold">
            Stage <span className="text-slate-100">1</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            Roadmap release
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            Zealy quests release to earn whitelist spots
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            ███ Documentation release
          </div>
        </div>
      </motion.div>
      <motion.div
        key="stage2"
        initial={{ translateX: "1000" }}
        transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
        whileInView={{ translateX: 0 }}
        className="md:-mt-20 w-full flex justify-end"
      >
        <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4 shadow-lg">
          <div className="text-slate-100 text-5xl text-center font-bold">
            Stage <span className="text-green-400">2</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Closed alpha testing of ███
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Whitelist sale details
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Uncovering of Docs
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Influencers collaborations
          </div>
        </div>
      </motion.div>
      <motion.div
        key="stage3"
        initial={{ translateX: "-1000" }}
        transition={{ duration: 1, ease: "backInOut" }}
        whileInView={{ translateX: 0 }}
        className="md:-mt-20 w-full flex justify-start"
      >
        <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
          <div className="text-green-400 text-5xl text-center font-bold">
            Stage <span className="text-slate-100">3</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Unveiling of ███ in an exclusive AMA (details TBA)
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Start of ███ Whitelist sale
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Development of RMD ecosystem contracts
          </div>
        </div>
      </motion.div>
      <motion.div
        key="stage4"
        initial={{ translateX: "1000" }}
        transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
        whileInView={{ translateX: 0 }}
        className="md:-mt-20 w-full flex justify-end"
      >
        <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
          <div className="text-slate-100 text-5xl text-center font-bold">
            Stage <span className="text-green-400">4</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Start of ███ public sale
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            ███ Marketing
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Release of ███ ████████ system
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Influencers collaborations
          </div>
        </div>
      </motion.div>
      <motion.div
        key="stage5"
        initial={{ translateX: "-1000" }}
        transition={{ duration: 1, ease: "backInOut" }}
        whileInView={{ translateX: 0 }}
        className="md:-mt-20 w-full flex justify-start"
      >
        <div className="w-full md:w-[48%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
          <div className="text-green-400 text-5xl text-center font-bold">
            Stage <span className="text-slate-100">5</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            ███ expansion to even more █████
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Potential ███ ugrades to receive ███████████ in ███ ██████
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            Release of ecosystem details
          </div>
        </div>
      </motion.div>
    </section>
  );
}
