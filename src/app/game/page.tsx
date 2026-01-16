"use client";

import { useState } from "react";
import Link from "next/link";

export default function GamePage() {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setIsCreating(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <Link
          href="/"
          className="inline-block mb-6 text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          ← 메인으로
        </Link>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          게임 설정
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              플레이어 이름
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900"
            />
          </div>

          {!isCreating ? (
            <>
              <button
                onClick={generateRoomCode}
                disabled={!playerName}
                className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                새 방 만들기
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  방 코드 입력
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="6자리 코드"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none uppercase text-gray-900 text-center text-2xl font-bold tracking-wider"
                />
              </div>

              <button
                disabled={!playerName || roomCode.length !== 6}
                className="w-full bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                방 참가하기
              </button>
            </>
          ) : (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">방 코드</p>
              <p className="text-4xl font-bold text-green-600 tracking-wider mb-4">
                {roomCode}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                친구들에게 이 코드를 공유하세요!
              </p>
              <button
                onClick={() => setIsCreating(false)}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                다시 설정하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
