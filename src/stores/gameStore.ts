"use client";

import { create } from "zustand";
import { Player } from "@/types/game";

interface GameStore {
  roomCode: string | null;
  players: Player[];
  selectedTheme: string | null;
  selectedItem: string | null;
  gameStatus: "waiting" | "playing" | "ended";
  liar: string | null;
  token: string | null;
  nickname: string | null;

  createRoom: () => Promise<string | null>;
  createNickname: (nickname: string) => Promise<string | null>;
  joinRoom: (roomId: string) => Promise<boolean>;

  setPlayers: (players: Player[]) => void;
  setGameResult: (theme: string, item: string, liar: string) => void;
  endGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  roomCode: null,
  players: [],
  selectedTheme: null,
  selectedItem: null,
  gameStatus: "waiting",
  liar: null,
  token: null,
  nickname: null,

  createRoom: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/create`, {
      method: "POST",
    });
    if (!res.ok) return null;
    const data = await res.json();
    set({ roomCode: data.roomId });
    return data.roomId;
  },

  createNickname: async (nickname: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/room/nickname`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname }),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const token = data.Authorization?.replace("Bearer ", "") ?? null;
    const savedNickname = data.nickname ?? nickname; // ✅ 응답에서 nickname 가져오기
    set({ token, nickname: savedNickname });
    return token;
  },

  joinRoom: async (roomId: string) => {
    const token = get().token;
    if (!token) return false;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, jwtToken: `Bearer ${token}` }),
    });
    if (!res.ok) return false;
    set({ roomCode: roomId });
    return true;
  },

  setPlayers: (players) => set({ players }),

  setGameResult: (theme, item, liar) =>
    set({
      selectedTheme: theme,
      selectedItem: item,
      liar,
      gameStatus: "playing",
    }),

  endGame: () => set({ gameStatus: "ended" }),

  resetGame: () =>
    set({
      selectedTheme: null,
      selectedItem: null,
      liar: null,
      gameStatus: "waiting",
    }),
}));
