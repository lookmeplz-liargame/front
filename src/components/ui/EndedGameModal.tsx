"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";
import { useGameStore } from "@/stores/gameStore";

interface Props {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}

export default function EndedGameModal({ open, onClose, onReset }: Props) {
  const { gameSnapshot, selectedItem, liar } = useGameStore();

  const answer = gameSnapshot?.answer ?? selectedItem;
  const liarName = gameSnapshot?.liar ?? liar;

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl text-black font-bold mb-6 text-center">
        게임 종료
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center bg-red-50 rounded-lg px-4 py-3">
          <span className="text-gray-500 text-sm">라이어</span>
          <span className="text-red-600 font-bold">
            {liarName || "알 수 없음"}
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onReset}>닫기</Button>
      </div>
    </Modal>
  );
}
