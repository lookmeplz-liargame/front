"use client";

export default function MainView() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <header className="bg-[#D85A2A] px-8 py-4 flex items-center justify-between">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white">
            <img
              src="/img/fox.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </span>
          <h1 className="text-white text-3xl font-bold">LIAR GAME</h1>
        </div>
      </header>
    </div>
  );
}
