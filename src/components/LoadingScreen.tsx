export default function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-10 overflow-hidden">
      <div className="animate-pulse absolute -top-16 -right-32 w-96 h-96 bg-green-400/40 rounded-full blur-3xl z-0" />
      <div className="remedy">REMEDY</div>
    </div>
  );
}
