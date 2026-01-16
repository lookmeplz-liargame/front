import Link from "next/link";

export default function Main() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-white to-gray-500 ">
      <header className="mb-8">
        <div className="flex items-center justify-center w-full h-28 px-8">
          <h1 className="flex items-center text-5xl font-bold text-gray-800">
            <img src="/img/fox.png" alt="logo" className="w-24 mr-4" />
            Liar Game
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
              <ul className="text-center list-disc list-inside space-y-2 text-gray-700">
                <ol>
                  모든 플레이어는 같은 <span className="font-bold">주제</span>를
                  받습니다
                </ol>
                <ol>
                  한 명의 <span className="text-red-500 font-bold">라이어</span>
                  는 다른 <span className="font-bold">주제</span>를 받습니다
                </ol>
                <ol>
                  대화를 통해{" "}
                  <span className="text-red-500 font-bold">라이어</span>를
                  찾아내세요
                </ol>
              </ul>
            </div>

            <Link href="/game">
              <button className="w-full bg-gradient-to-r from-black to-gray-400 text-white font-bold py-4 px-5 rounded-lg text-xl hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                GAME START
              </button>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}
