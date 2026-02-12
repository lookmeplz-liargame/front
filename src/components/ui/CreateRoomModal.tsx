"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  roomCode: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CreateRoomModal({
  open,
  roomCode,
  onClose,
  onConfirm,
}: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setToast("방 코드 복사 완료");
    } catch {
      setToast("복사 실패");
    }
    setTimeout(() => setToast(null), 2000);
  };

  // 🔹 open 상태가 바뀔 때마다 input 값이 바뀌도록 강제
  const [inputValue, setInputValue] = useState(roomCode);
  useEffect(() => {
    if (open) setInputValue(roomCode);
  }, [open, roomCode]);

  return (
    <>
      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
                     bg-black text-white px-4 py-2 rounded-full
                     text-sm shadow-lg"
        >
          {toast}
        </div>
      )}

      <Modal open={open} onClose={onClose}>
        <h2 className="text-xl font-bold mb-4 text-center">방 만들기</h2>

        <div className="flex items-center gap-2 mb-4">
          <input
            value={inputValue ?? ""}
            readOnly
            className="flex-1 border rounded-md p-2 bg-gray-100 text-center font-mono"
          />
          <Button onClick={handleCopy}>복사</Button>
        </div>

        <Button onClick={onConfirm} className="w-full">
          확인
        </Button>
      </Modal>
    </>
  );
}
