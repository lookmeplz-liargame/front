"use client";

import { create } from "zustand";
import { Player } from "@/types/game";

interface GameSnapshot {
  answer: string | null;
  liar: string | null;
}

interface GameStore {
  roomCode: string | null;
  players: Player[];
  selectedTheme: string | null;
  selectedItem: string | null;
  liar: string | null;
  gameStatus: "waiting" | "playing" | "ended";
  token: string | null;
  nickname: string | null;

  /*
    🔧 트러블슈팅: gameSnapshot — 모달 표시용 최종 데이터

    각 클라이언트가 아는 정보:
      시민:   selectedItem(정답) O  / liar(라이어닉네임) X
      라이어: selectedItem(정답) X  / liar(라이어닉네임) O (본인이니까)

    서버 game_ended 페이로드가 Redis 에러로 전부 null이라
    setGameResult에서 null 방어를 해도 한쪽은 항상 빠짐.

    해결:
    시민 클라이언트가 game_end를 emit하는 시점에
    정답(selectedItem)과 라이어 닉네임(data.nickname)을 둘 다 알고 있음.
    → 그 시점에 setGameSnapshot으로 미리 저장.
    → game_ended 수신 후 setGameResult에서 snapshot 우선 사용.

    라이어 클라이언트:
    game_ended 수신 시 snapshot이 없으므로
    server값 or 기존 store값(liar=본인닉네임)으로 채움.
    정답은 server null → "알 수 없음" (서버 문제, 해결 불가)
  */
  gameSnapshot: GameSnapshot | null;
  setGameSnapshot: (snapshot: GameSnapshot) => void;

  createRoom: () => Promise<string | null>;
  createNickname: (nickname: string) => Promise<string | null>;
  joinRoom: (roomId: string) => Promise<boolean>;

  setPlayers: (players: Player[]) => void;
  setGameInfo: (theme: string | null, item: string | null) => void;
  setGameResult: (
    theme: string | null,
    item: string | null,
    liar: string | null,
  ) => void;
  setGameStatus: (status: "waiting" | "playing" | "ended") => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  roomCode: null,
  players: [],
  selectedTheme: null,
  selectedItem: null,
  liar: null,
  gameStatus: "waiting",
  token: null,
  nickname: null,
  gameSnapshot: null,

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
    if (!res.ok) return false;
    set({ roomCode: roomId });
    return true;
  },

  setPlayers: (players) => set({ players }),

  /*
    game_info 수신 시:
      라이어: setGameInfo(category, null) → liar = 본인 nickname 저장
      시민:   setGameInfo(null, answer)   → selectedItem 저장
  */
  setGameInfo: (theme, item) => {
    const { nickname } = get();
    set({
      selectedTheme: theme,
      selectedItem: item,
      // theme만 있고 item이 null = 라이어 → 본인 닉네임을 liar로 저장
      ...(theme !== null && item === null ? { liar: nickname } : {}),
    });
  },

  /*
    시민 클라이언트가 game_end emit 직전에 호출.
    정답 + 라이어 닉네임을 snapshot에 미리 저장.
    game_ended 수신 후 setGameResult에서 이 값을 우선 사용.
  */
  setGameSnapshot: (snapshot) => set({ gameSnapshot: snapshot }),

  /*
    ============================================================
    🔧 트러블슈팅: setGameResult — snapshot 우선, null 방어

    우선순위:
    1. gameSnapshot (시민이 game_end 직전에 저장한 값) ← 가장 정확
    2. 서버 game_ended 페이로드값
    3. 기존 store값 (game_info 때 저장한 값)

    이 순서로 null이 아닌 첫 번째 값을 사용.
    ============================================================
  */
  setGameResult: (theme, item, liar) =>
    set((state) => {
      const snapshot = state.gameSnapshot;
      const resolvedAnswer = snapshot?.answer ?? item ?? state.selectedItem;
      const resolvedLiar = snapshot?.liar ?? liar ?? state.liar;
      return {
        selectedTheme: theme ?? state.selectedTheme,
        selectedItem: resolvedAnswer,
        liar: resolvedLiar,
        gameStatus: "ended",
        gameSnapshot: {
          answer: resolvedAnswer,
          liar: resolvedLiar,
        },
      };
    }),

  setGameStatus: (status) => set({ gameStatus: status }),

  resetGame: () =>
    set({
      selectedTheme: null,
      selectedItem: null,
      liar: null,
      gameStatus: "waiting",
      gameSnapshot: null,
    }),
}));
