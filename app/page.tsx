"use client";
import Header from "@/components/Header";
import backgroundPoster from "@/statics/images/poster.jpg";
import BackgroundLines from "@/components/BackgroundLines";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex items-stretch justify-center">
      <Header />
      <BackgroundLines />

      <video
        poster={backgroundPoster.src}
        autoPlay
        muted
        loop
        className="object-cover w-screen h-screen fixed"
      >
        <source src={"/videos/back1.mp4"} type="video/mp4" />
      </video>

      {/* Screen height - Header height - header top spacing */}
      <section className="relative w-full px-7 mt-48 md:mt-32 flex items-stretch z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1}}
          className="text-5xl md:text-7xl mt-48 w-full flex justify-center"
        >
          COMING SOON!
          {/* <iframe
            className="w-full md:w-4/5 h-[550px] px-0 md:px-6 border-0 border-none"
            allow-same-origin="true"
            src="https://launch.rbx.ae/dexwidget?ref_wallet=0x1E354E6EC51a721a5e4e703E96542eCA5D9E3dBa&spending_chain_id=56&receiving_chain_id=56&spending_token=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&receiving_token=0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357"
            id="_RBX_DEX_WIDGET"
          ></iframe>
          <script src="https://launch.rbx.ae/widgetari/arbitor.js"></script> */}
        </motion.div>
      </section>
    </main>
  );
}

{
  /* <Suspense fallback={<div>Loading</div>}>
<ViewCounter />
</Suspense> */
}
