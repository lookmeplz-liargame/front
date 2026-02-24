"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  result: string;
  theme: string;
  onClose: () => void;
  onReset: () => void;
}

export default function EndedGameModal({
  open,
  theme,
  result,
  onClose,
  onReset,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl text-black font-bold mb-4 text-center">
        게임 종료
      </h2>
      <p className="text-center text-red-600 mb-4">선택되었던 테마 : {theme}</p>
      <p className="text-center text-red-600 mb-4">
        마피아는 {result} 였습니다.
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={onReset}>닫기</Button>
      </div>
    </Modal>
  );
}
