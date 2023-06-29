"use client";
import logo from "@/src/statics/images/logo.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GiCheckMark, GiTireIronCross } from "react-icons/gi";

export default function Roadmap() {
  const [showLeft, setShowLeft] = useState(true);
  const [showRoadmapAnimation, setShowRoadmapAnimation] = useState(false);

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    if (scrollY > 440) {
      setShowRoadmapAnimation(true);
    } else {
      setShowRoadmapAnimation(false);
    }

    if (scrollY <= 616) {
      setShowLeft(true);
    } else if (scrollY <= 800) {
      setShowLeft(false);
    } else {
      setShowLeft(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="roadmap"
      onScroll={onScroll}
      className="relative z-10 w-full px-4 md:px-7 flex flex-col gap-10 md:gap-0 items-center py-16"
    >
      <h2 className='font-bold text-5xl md:text-7xl text-center'>
        ROADMAP
      </h2>
      {showRoadmapAnimation && (
        <div className="hidden md:block">
          {showLeft ? (
            <motion.div
              key="left-anim"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="fixed top-1/2 left-1/2 -translate-x-full -translate-y-0.5 bg-gradient-to-r from-transparent to-green-400 h-1 rounded-md"
            />
          ) : (
            <motion.div
              key="right-anim"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="fixed top-1/2 left-1/2 -translate-y-0.5 bg-gradient-to-l from-transparent to-green-400 h-1  rounded-md"
            />
          )}
          <div className="fixed top-1/2 left-1/2 translate-x-[2px] -translate-y-20 bg-gradient-to-b from-transparent via-green-400 to-transparent w-[2px] h-40" />
          <div className="fixed top-1/2 left-1/2 -translate-x-[17px] -translate-y-5 bg-green-400 w-10 h-10 rounded-full ">
            <Image src={logo} alt="logo" />
          </div>
        </div>
      )}
      <motion.div
        key="2023-q3"
        initial={{ translateX: "-1000" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className="mt-5 w-full flex justify-start"
      >
        <div className="w-full md:w-[45%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
          <div className="text-green-400 text-5xl text-center font-bold">
            2023 <span className="text-slate-100">Q3</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            This is point 2. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            This is point 2. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
        </div>
      </motion.div>
      <motion.div
        key="2023-q4"
        initial={{ translateX: "1000" }}
        transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
        whileInView={{ translateX: 0 }}
        className="md:-mt-20 w-full flex justify-end"
      >
        <div className="w-full md:w-[45%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
          <div className="text-slate-100 text-5xl text-center font-bold">
            2023 <span className="text-green-400">Q3</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            This is point 2. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            This is point 2. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
        </div>
      </motion.div>
      <motion.div
        key="2024-q1"
        initial={{ translateX: "-1000" }}
        transition={{ duration: 1, ease: "backInOut" }}
        whileInView={{ translateX: 0 }}
        className="md:-mt-20 w-full flex justify-start"
      >
        <div className="w-full md:w-[45%] backdrop-blur-md bg-gradient-to-b from-transparent to-slate-100/20 rounded-md p-4">
          <div className="text-green-400 text-5xl text-center font-bold">
            2023 <span className="text-slate-100">Q3</span>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            This is point 2. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiTireIronCross size={20} className="text-slate-100" />
            This is point 2. We need some text here.
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <GiCheckMark size={20} className="text-green-400" />
            This is point 1. We need some text here.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
