"use client";

export default function MainView() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <header className="bg-[#D85A2A] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl">
              <img src="/img/fox.png" alt="logo" />
            </span>
          </div>
          <h1 className="text-white text-3xl font-bold">LIAR GAME</h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-[#D85A2A] px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            Create
          </button>
          <button className="bg-white text-[#D85A2A] px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            attend
          </button>
        </div>
      </header>
    </div>
  );
}
