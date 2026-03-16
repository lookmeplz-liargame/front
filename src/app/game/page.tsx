"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";
import { useGameStore } from "@/stores/gameStore";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { registerGameEvents } from "@/lib/socketGame";
import { ChatMessagePayload } from "@/types/game";
import EndedGameModal from "@/components/ui/EndedGameModal";

export default function GamePage() {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const {
    roomCode,
    players,
    selectedTheme,
    selectedItem,
    gameStatus,
    token,
    nickname,
    resetGame,
  } = useGameStore();

  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const [myRole, setMyRole] = useState<"citizen" | "liar" | null>(null);
  const isLiar = myRole === "liar";

  useEffect(() => {
    if (!roomCode || !token || !nickname) return;

    const socket = getSocket();
    socketRef.current = socket;

    registerGameEvents(
      socket,
      token,
      nickname,
      roomCode,
      setConnected,
      (msg) => setMessages((prev) => [...prev, msg]),
      setJoinError,
      (role) => {
        setShowEndModal(false);
        setMyRole(role);
        setMessages([]);
      },
    );

    if (!socket.connected) {
      socket.connect();
    } else {
      setConnected(true);
      socket.emit("join", { roomId: roomCode, jwt: token });
    }

    return () => {
      socket.removeAllListeners();
      disconnectSocket();
    };
  }, [roomCode, token, nickname]);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (gameStatus === "ended") {
      setShowEndModal(true);
    }
  }, [gameStatus]);

  const handleSendMessage = () => {
    if (!chatInput.trim() || !socketRef.current) return;
    socketRef.current.emit("chat", { message: chatInput });
    setChatInput("");
  };

  const handleGameStart = () => socketRef.current?.emit("game_start");
  const handleGameEnd = () => socketRef.current?.emit("game_end");

  /*
    🔧 방 나가기 — REST API 호출 추가

    기존 문제:
    disconnectSocket()만 하면 소켓은 끊기지만
    서버 Redis에 멤버가 남아있음.
    → 같은 토큰으로 새 방 만들고 입장해도 이전 방 정보가 남아서
      "진행 중인 방"으로 리다이렉트되는 현상.

    해결:
    /room/quit API를 먼저 호출해서 서버에서 멤버 제거 후 소켓 종료.
    실패해도 소켓은 끊고 홈으로 이동 (에러 무시).
  */
  const handleExitRoom = async () => {
    if (roomCode) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/room/quit?roomId=${roomCode}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (e) {
        // 실패해도 나가기는 진행
      }
    }
    disconnectSocket();
    resetGame();
    router.push("/");
  };

  const handleReset = () => {
    setShowEndModal(false);
    setMyRole(null);
    resetGame();
  };

  if (joinError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{joinError}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-700 rounded-xl hover:bg-gray-600"
          >
            홈으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">방 코드: {roomCode}</h1>
            <div className="flex gap-2">
              {gameStatus === "waiting" && (
                <button
                  onClick={handleGameStart}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-xl text-sm font-bold shadow-md transition"
                >
                  게임 시작
                </button>
              )}
              {gameStatus === "playing" && (
                <button
                  onClick={handleGameEnd}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-sm font-bold shadow-md transition"
                >
                  게임 종료
                </button>
              )}
              <button
                onClick={handleExitRoom}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-xl text-sm font-bold shadow-md transition"
              >
                나가기
              </button>
            </div>
          </div>

          {gameStatus === "playing" && (
            <div className="bg-gray-800 rounded-2xl p-4 mb-6 shadow-xl text-center">
              {isLiar ? (
                <>
                  <p className="text-gray-400 text-sm">당신은</p>
                  <p className="text-2xl font-bold text-red-400">라이어</p>
                  <p className="text-gray-400 mt-2">테마: {selectedTheme}</p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-sm">단어</p>
                  <p className="text-xl font-bold text-green-400">
                    {selectedItem}
                  </p>
                </>
              )}
            </div>
          )}

          <div className="bg-gray-800 rounded-2xl p-4 mb-6 shadow-xl">
            <h2 className="text-sm text-gray-400 mb-3">
              접속 인원 ({players.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="bg-gray-700 px-4 py-2 rounded-lg text-sm"
                >
                  {player.nickname}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 mb-8 shadow-xl flex flex-col h-80">
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto mb-4 border border-gray-700 rounded-md p-3 bg-gray-900"
            >
              {messages.length === 0 && (
                <p className="text-gray-400 text-center">
                  채팅 메시지가 없습니다.
                </p>
              )}
              {messages.map((msg, idx) => {
                const isMine = msg.nickname === nickname;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col mb-2 ${isMine ? "items-end" : "items-start"}`}
                  >
                    {!isMine && (
                      <span className="text-xs text-purple-400 mb-1">
                        {msg.nickname}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                        isMine
                          ? "bg-purple-600 text-white rounded-tr-sm"
                          : "bg-gray-700 text-gray-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {new Date(msg.time).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-xl px-4 py-2 text-black"
                placeholder="메시지 입력..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={!connected}
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-green-600 rounded-xl hover:bg-green-500 transition"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </div>

      <EndedGameModal
        open={showEndModal}
        onClose={() => setShowEndModal(false)}
        onReset={handleReset}
      />
    </>
  );
}
