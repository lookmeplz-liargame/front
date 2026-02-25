import { Socket } from "socket.io-client";
import {
  JoinSuccessPayload,
  UserListPayload,
  GameInfoPayload,
  GameEndedPayload,
  ChatMessagePayload,
} from "@/types/game";
import { useGameStore } from "@/stores/gameStore";

const toPlayers = (members: string[]) =>
  members.map((n) => ({ id: n, nickname: n }));

export const registerGameEvents = (
  socket: Socket,
  token: string,
  nickname: string,
  onConnected: (v: boolean) => void,
  onMessage: (msg: ChatMessagePayload) => void,
  onJoinError: (msg: string) => void,
) => {
  const { setPlayers, setGameResult } = useGameStore.getState();
  const roomId = "ef4e9e71-8127-4632-baa9-e5ffdf2f39f3";

  socket.on("connect", () => {
    onConnected(true);
    socket.emit("join", { roomId, jwt: token });
  });

  socket.on("join_success", (data: JoinSuccessPayload) => {
    setPlayers(toPlayers(data.members));
  });

  socket.on("join_error", (data: { message: string }) => {
    onJoinError(data.message);
  });

  socket.on("user_joined", (data: UserListPayload) => {
    setPlayers(toPlayers(data.members));
  });

  socket.on("user_left", (data: UserListPayload) => {
    setPlayers(toPlayers(data.members));
  });

  socket.on("chat_message", (data: ChatMessagePayload) => {
    onMessage(data);
  });

  socket.on("game_info", (data: GameInfoPayload) => {
    if (data.role === "liar") {
      setGameResult(data.category || "", "", nickname);
    } else {
      setGameResult("", data.answer || "", "");
    }
  });

  socket.on("game_started", () => {});

  socket.on("game_ended", (data: GameEndedPayload) => {
    setGameResult(data.category, data.answer, data.liarNickname);
  });

  socket.on("game_error", (data: { message: string }) => {
    alert(data.message);
  });

  socket.on("disconnect", () => {
    onConnected(false);
  });
};
