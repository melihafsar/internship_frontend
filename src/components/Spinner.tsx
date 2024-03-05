export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-black/20 flex items-center justify-center">
      <div
        className="border-slate-200 h-16 w-16 animate-spin rounded-full border-8 border-t-orange-600 "
        role="status"
      ></div>
    </div>
  );
}
