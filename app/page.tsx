"use client";
import Image from "next/image";
import ViewCounter from "@/components/view-counter";
import { Suspense, use, useState } from "react";
import Header from "@/components/Header";
import { AiOutlineLaptop } from "react-icons/ai";
import background from "@/statics/images/bg2.png";
import backgroundPoster from "@/statics/images/poster.jpg";
import BackgroundLines from "@/components/BackgroundLines";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-around">
      <Header />
      <BackgroundLines />

      <video
        poster={backgroundPoster.src}
        autoPlay
        muted
        loop
        className="object-cover w-screen h-screen fixed z-0"
      >
        <source src={"/videos/video.mp4"} type="video/mp4" />
      </video>

      <div className="mt-20 relative z-10 px-8 w-full max-w-7xl flex justify-between gap-10">
        hi
      </div>
    </main>
  );
}

{
  /* <Suspense fallback={<div>Loading</div>}>
<ViewCounter />
</Suspense> */
}
