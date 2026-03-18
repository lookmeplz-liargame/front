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
  roomCode: string,
  onConnected: (v: boolean) => void,
  onMessage: (msg: ChatMessagePayload) => void,
  onJoinError: (msg: string) => void,
  onRole: (role: "citizen" | "liar") => void,
  onGameEnded: (data: GameEndedPayload) => void,
) => {
  if (typeof onConnected !== "function") {
    throw new Error("registerGameEvents: onConnected must be a function");
  }

  const { setPlayers } = useGameStore.getState();

  socket.on("connect", () => {
    onConnected(true);
    socket.emit("join", { roomId: roomCode, jwt: `Bearer ${token}` });
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

  /*
    ============================================================
    트러블슈팅: 라이어 정답 체크 — 시민 클라이언트에서 판단

    라이어는 answer(selectedItem)를 모름 → 직접 비교 불가.
    시민은 answer를 알고 있고, chat_message로 누가 무슨 말을 쳤는지 수신함.

    조건:
      1. 내가 시민 (selectedItem 있음)
      2. 내가 보낸 게 아님
      3. 그 메시지가 정답과 일치

    → 라이어가 정답을 맞춘 것으로 간주하고 game_end emit.
    → game_ended 수신 후 서버에서 revealData 받아서 모달 표시.
    ============================================================
  */
  socket.on("chat_message", (data: ChatMessagePayload) => {
    onMessage(data);

    const store = useGameStore.getState();
    const { selectedItem, gameStatus } = store;
    const amILiar = !selectedItem;

    if (gameStatus !== "playing" || amILiar) return;

    if (
      selectedItem &&
      data.nickname !== nickname &&
      data.message.trim() === selectedItem.trim()
    ) {
      socket.emit("game_end");
    }
  });

  socket.on("game_info", (data: GameInfoPayload) => {
    const store = useGameStore.getState();

    if (data.role === "liar") {
      store.setGameInfo(data.category || null, null);
    } else {
      store.setGameInfo(null, data.answer || null);
    }

    store.setGameStatus("playing");
    onRole(data.role as "citizen" | "liar");
  });

  socket.on("game_started", () => {
    useGameStore.getState().setGameStatus("playing");
  });

  /*
    서버 game_ended 페이로드를 gameStore 안 거치고
    콜백으로 바로 올려보냄 → game.tsx에서 로컬 state로 저장
    → gameStore 우선순위 문제 없이 바로 모달 표시
  */
  socket.on("game_ended", (data: GameEndedPayload) => {
    onGameEnded(data);
    useGameStore.getState().setGameStatus("ended");
  });

  socket.on("game_error", (data: { message: string }) => {
    alert(data.message);
  });

  socket.on("disconnect", () => {
    onConnected(false);
  });

  socket.onAny((event, ...args) => {
    if (event !== "chat_message") {
      console.log(`[socket] 📨 ${event}`, args);
    }
  });
};
