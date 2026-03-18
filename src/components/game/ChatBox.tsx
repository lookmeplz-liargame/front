"use client";

import { useRef, useEffect } from "react";
import { ChatMessagePayload } from "@/types/game";

interface Props {
  messages: ChatMessagePayload[];
  chatInput: string;
  connected: boolean;
  nickname: string | null;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatBox({
  messages,
  chatInput,
  connected,
  nickname,
  onInputChange,
  onSend,
}: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="bg-gray-800 rounded-2xl p-4 mb-8 shadow-xl flex flex-col h-80">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto mb-4 border border-gray-700 rounded-md p-3 bg-gray-900"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">채팅 메시지가 없습니다.</p>
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
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          disabled={!connected}
        />
        <button
          onClick={onSend}
          className="px-6 py-2 bg-green-600 rounded-xl hover:bg-green-500 transition"
        >
          전송
        </button>
      </div>
    </div>
  );
}
