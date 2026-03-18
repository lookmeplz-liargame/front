"use client";

import { create } from "zustand";
import { Player } from "@/types/game";

interface RevealData {
  liarNickname: string;
  answer: string;
  category: string;
}

interface GameStore {
  roomCode: string | null;
  players: Player[];
  selectedTheme: string | null;
  selectedItem: string | null;
  gameStatus: "waiting" | "playing" | "ended";
  token: string | null;
  nickname: string | null;
  revealData: RevealData | null;

  createRoom: () => Promise<string | null>;
  createNickname: (nickname: string) => Promise<string | null>;
  joinRoom: (roomId: string) => Promise<boolean | "NOT_FOUND">;

  setPlayers: (players: Player[]) => void;
  setGameInfo: (theme: string | null, item: string | null) => void;
  setRevealData: (data: RevealData) => void;
  setGameStatus: (status: "waiting" | "playing" | "ended") => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  roomCode: null,
  players: [],
  selectedTheme: null,
  selectedItem: null,
  gameStatus: "waiting",
  token: null,
  nickname: null,
  revealData: null,

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
    const savedNickname = data.nickname ?? nickname;
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
    if (res.status === 404) return "NOT_FOUND";
    if (!res.ok) return false;
    set({ roomCode: roomId });
    return true;
  },

  setPlayers: (players) => set({ players }),

  /*
    game_info 수신 시:
      라이어: setGameInfo(category, null)
      시민:   setGameInfo(null, answer)
  */
  setGameInfo: (theme, item) => {
    set({ selectedTheme: theme, selectedItem: item });
  },

  /*
    서버 game_ended 페이로드를 그대로 저장.
    liarNickname, answer, category 필드명 그대로 사용.
  */
  setRevealData: (data) => set({ revealData: data, gameStatus: "ended" }),

  setGameStatus: (status) => set({ gameStatus: status }),

  resetGame: () =>
    set({
      selectedTheme: null,
      selectedItem: null,
      gameStatus: "waiting",
      revealData: null,
    }),
}));
