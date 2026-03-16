export interface Player {
  id: string;
  nickname: string;
}

export interface JoinSuccessPayload {
  roomId: string;
  nickname: string;
  socketId: string;
  members: string[]; // 백엔드가 string[] 보냄
  maxPlayers: number;
}

export interface UserListPayload {
  socketId: string;
  nickname: string;
  members: string[]; // 백엔드가 string[] 보냄
}

export interface GameInfoPayload {
  role: "liar" | "citizen";
  answer?: string;
  category?: string;
}

export interface GameEndedPayload {
  liarNickname: string;
  answer: string;
  category: string;
}

export interface ChatMessagePayload {
  nickname: string;
  message: string;
  socketId: string;
  time: string;
}

/*export interface Player {
  id: string;
  nickname: string;
  isHost: boolean;
}

export type Theme = "동물" | "직업" | "음식";

export interface ThemeData {
  name: Theme;
  items: string[];
}

export const themeList: ThemeData[] = [
  { name: "동물", items: ["강아지", "고양이", "코끼리", "호랑이"] },
  { name: "직업", items: ["간호사", "의사", "선생님", "경찰"] },
  { name: "음식", items: ["김치", "피자", "떡볶이"] },
];

export interface GameState {
  roomCode: string | null;
  players: Player[];
  selectedTheme: Theme | null;
  gameStatus: "waiting" | "playing" | "ended";
}
  로컬 테스트용
*/
