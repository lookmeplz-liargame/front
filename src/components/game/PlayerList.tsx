interface Props {
  players: { id: string; nickname: string }[];
}

export default function PlayerList({ players }: Props) {
  return (
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
  );
}
