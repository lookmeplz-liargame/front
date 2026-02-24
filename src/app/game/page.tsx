"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Theme } from "@/types/game";
import PlayingGameModal from "@/components/ui/PlayingGameModal";
import EndedGameModal from "@/components/ui/EndedGameModal";

export default function GamePage() {
  const {
    roomCode,
    players,
    selectedTheme,
    liar,
    gameStatus,
    setTheme,
    startGame,
    resetGame,
  } = useGameStore();

  const [themeChoice, setThemeChoice] = useState<Theme | null>(null);
  const [showPlayingModal, setShowPlayingModal] = useState(false);
  const [showEndedModal, setShowEndedModal] = useState(false);

  const themes: Theme[] = ["동물", "직업", "음식"];

  const handleGameButton = () => {
    if (gameStatus === "waiting") {
      if (!themeChoice) {
        alert("테마를 선택하세요");
        return;
      }

      setTheme(themeChoice);
      startGame();
      setShowPlayingModal(true);
    } else if (gameStatus === "playing") {
      setShowPlayingModal(false);
      setShowEndedModal(true);
    }
  };

  const handleEndGameModalClose = () => {
    setShowEndedModal(false);
    resetGame();
    setThemeChoice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">방 코드: {roomCode}</h1>

          {gameStatus === "playing" && (
            <button
              onClick={() => setShowPlayingModal(true)}
              className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-xl text-sm font-bold shadow-md transition-all"
            >
              내 상태 확인
            </button>
          )}
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-center">테마 선택</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setThemeChoice(theme)}
                className={`px-6 py-3 rounded-2xl font-bold shadow-xl transition-all duration-200
                  ${themeChoice === theme ? "bg-green-500 scale-105 shadow-lg" : "bg-green-600 hover:bg-green-500"}`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

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
            onClick={handleGameButton}
            className="px-10 py-4 bg-green-500 hover:bg-green-400 rounded-2xl text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105"
          >
            {gameStatus === "waiting" ? "게임 시작" : "게임 종료"}
          </button>
        </div>
      </div>

      <PlayingGameModal
        open={showPlayingModal}
        theme={selectedTheme ?? ""}
        onClose={() => setShowPlayingModal(false)}
        onEndGame={() => {
          setShowPlayingModal(false);
          setShowEndedModal(true);
        }}
      />

      <EndedGameModal
        open={showEndedModal}
        theme={selectedTheme ?? ""}
        result={liar ?? "없음"}
        onClose={() => setShowEndedModal(false)}
        onReset={handleEndGameModalClose}
      />
    </div>
  );
}
