export interface Player {
  id: string;
  nickname: string;
  isHost: boolean;
}

export type Theme = "동물" | "직업" | "음식";

export interface GameState {
  roomCode: string | null;
  players: Player[];
  selectedTheme: Theme | null;
  gameStatus: "waiting" | "playing" | "ended";
}
