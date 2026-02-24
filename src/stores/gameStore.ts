"use client";

import { create } from "zustand";
import { Player, Theme, ThemeData, themeList } from "@/types/game";

interface GameStore {
  roomCode: string | null;
  players: Player[];
  selectedTheme: Theme | null;
  selectedItem: string | null;
  gameStatus: "waiting" | "playing" | "ended";
  liar: string | null;

  createRoom: () => void;
  setRoom: (code: string) => void;
  addPlayer: (nickname: string) => void;
  setTheme: (theme: Theme) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  roomCode: null,
  players: [],
  selectedTheme: null,
  selectedItem: null,
  gameStatus: "waiting",
  liar: null,

  createRoom: () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    set({
      roomCode: code,
      players: [],
      selectedTheme: null,
      selectedItem: null,
      gameStatus: "waiting",
      liar: null,
    });
  },

  setRoom: (code) => set({ roomCode: code }),

  addPlayer: (nickname) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: crypto.randomUUID(),
          nickname,
          isHost: state.players.length === 0,
        },
      ],
    })),

  setTheme: (theme) => {
    set({ selectedTheme: theme, selectedItem: null });
  },

  startGame: () =>
    set((state) => {
      const themeData: ThemeData | undefined = themeList.find(
        (t) => t.name === state.selectedTheme,
      );

      // 랜덤으로 하나만 선택
      const item =
        themeData && themeData.items.length > 0
          ? themeData.items[Math.floor(Math.random() * themeData.items.length)]
          : null;

      const liar =
        state.players.length > 0
          ? state.players[Math.floor(Math.random() * state.players.length)]
              .nickname
          : null;

      return {
        gameStatus: "playing",
        selectedItem: item,
        liar,
      };
    }),

  resetGame: () =>
    set({
      selectedTheme: null,
      selectedItem: null,
      gameStatus: "waiting",
      liar: null,
    }),
}));
