export default function Chart() {
  return (
    <div className="w-full md:w-2/3 bg-red-200 backdrop-blur-md bg-slate-100/20">
      <iframe
        className="w-full h-[430px]"
        src="https://dexscreener.com/bsc/0x766d7ed89297Cc97FFBc8101a78438b3D59ae087?embed=1&theme=dark&trades=0&info=0"
      ></iframe>
    </div>
  );
}
