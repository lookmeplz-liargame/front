/*"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Theme } from "@/types/game";

export function Gamestate() {
  const { selectedTheme, setTheme, startGame, resetGame } = useGameStore();
  const [showPlayingModal, setShowPlayingModal] = useState(false);
  const [showEndedModal, setShowEndedModal] = useState(false);

  const handleStart = (theme: Theme) => {
    if (!theme) {
      alert("테마를 선택하세요");
      return;
    }

    setTheme(theme);
    startGame();
    setShowPlayingModal(true);
  };

  const handleEndGame = () => {
    setShowPlayingModal(false);
    setShowEndedModal(true);
  };

  const handleReset = () => {
    setShowEndedModal(false);
    resetGame();
  };

  return {
    showPlayingModal,
    showEndedModal,
    handleStart,
    handleEndGame,
    handleReset,
  };
}*/
//따로 서버에서 받아오기때문에 거의 불 필요
