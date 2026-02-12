"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/gameStore";

export default function GamePage() {
  const { roomCode, players } = useGameStore(); // store에서 바로 가져오기
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const themes = ["동물", "직업", "음식"];

  const handleStart = () => {
    if (!selectedTheme) {
      alert("테마를 선택하세요");
      return;
    }

    alert(`${selectedTheme} 테마로 게임 시작`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">방 코드: {roomCode}</h1>
        </div>

        {/* 테마 선택 */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-center">테마 선택</h2>

          <div className="flex justify-center gap-4">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-6 py-3 rounded-xl transition-all duration-200
                  ${
                    selectedTheme === theme
                      ? "bg-red-500 scale-105 shadow-lg"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* 플레이어 목록 */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-center">
            현재 접속 인원 ({players.length}명)
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-gray-700 rounded-lg p-4 text-center shadow-md"
              >
                {player.nickname}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleStart}
            className="px-10 py-4 bg-green-500 hover:bg-green-400 rounded-2xl text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105"
          >
            게임 시작
          </button>
        </div>
      </div>
    </div>
  );
}
