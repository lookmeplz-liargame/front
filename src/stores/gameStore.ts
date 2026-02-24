"use client";

import { create } from "zustand";
import { Player, Theme } from "@/types/game";

interface GameStore {
  roomCode: string | null;
  players: Player[];
  selectedTheme: Theme | null;
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

  setTheme: (theme) => set({ selectedTheme: theme }),

  startGame: () =>
    set((state) => {
      const liar =
        state.players.length > 0
          ? state.players[Math.floor(Math.random() * state.players.length)]
              .nickname
          : null;

      return {
        gameStatus: "playing",
        liar,
      };
    }),

  resetGame: () =>
    set({
      roomCode: null,
      players: [],
      selectedTheme: null,
      gameStatus: "waiting",
      liar: null,
    }),
}));
