interface Props {
  isLiar: boolean;
  selectedTheme: string | null;
  selectedItem: string | null;
}

export default function RoleBox({
  isLiar,
  selectedTheme,
  selectedItem,
}: Props) {
  return (
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
          <p className="text-xl font-bold text-green-400">{selectedItem}</p>
        </>
      )}
    </div>
  );
}
