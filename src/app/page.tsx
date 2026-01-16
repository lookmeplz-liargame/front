import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
          🎭 Liar Game
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          거짓말쟁이를 찾아라! 친구들과 함께 즐기는 추리 게임
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              게임 방법
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>모든 플레이어는 같은 주제를 받습니다</li>
              <li>단, 한 명의 라이어는 다른 주제를 받습니다</li>
              <li>대화를 통해 라이어를 찾아내세요!</li>
            </ul>
          </div>

          <Link href="/game">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg text-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              게임 시작하기 🎮
            </button>
          </Link>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>3~10명의 플레이어 추천</p>
          </div>
        </div>
      </div>
    </div>
  );
}
