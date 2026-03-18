"use client";

import { useState } from "react";
import CreateRoom from "@/components/lobby/CreateRoom";
import JoinRoom from "@/components/lobby/JoinRoom";
import LobbyAction from "@/components/lobby/Action";

export default function Main() {
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-white to-gray-500">
      <header className="mb-8">
        <div className="flex items-center justify-center w-full h-28 px-8">
          <h1 className="flex items-center text-5xl font-bold text-gray-800 drop-shadow-lg">
            <a
              href="https://github.com/lookmeplz-liargame/front"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/fox.png"
                alt="logo"
                className="w-24 mr-4 drop-shadow-xl hover:scale-110 transition-transform duration-300"
              />
            </a>
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Liar Game
            </span>
          </h1>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <main className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-center text-xl font-bold mb-2 text-gray-800">
                게임 방법
              </h2>
              <ul className="text-center space-y-2 text-gray-700">
                <li>
                  모든 플레이어는 같은 <b>주제</b>를 받습니다
                </li>
                <li>
                  한 명의 <span className="text-red-500 font-bold">라이어</span>
                  는 다른 주제를 받습니다
                </li>
                <li>
                  대화를 통해{" "}
                  <span className="text-red-500 font-bold">라이어</span>를
                  찾아내세요
                </li>
              </ul>
            </div>

            <LobbyAction
              onCreate={() => setCreateOpen(true)}
              onJoin={() => setJoinOpen(true)}
            />
          </main>
        </div>
      </div>

      <CreateRoom open={createOpen} onClose={() => setCreateOpen(false)} />

      <JoinRoom open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
