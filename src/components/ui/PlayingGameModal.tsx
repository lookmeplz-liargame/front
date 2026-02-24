"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  theme: string;
  item: string;
  onClose: () => void;
  onEndGame: () => void;
}

export default function PlayingGameModal({
  open,
  theme,
  item,
  onClose,
  onEndGame,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl text-black font-bold mb-4 text-center">
        게임 진행중
      </h2>
      <p className="text-center text-red-600 mb-4">선택된 테마: {theme}</p>
      <p className="text-center text-red-600 mb-4 font-bold">
        {theme} : {item}
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={onClose}>닫기</Button>
      </div>
    </Modal>
  );
}
