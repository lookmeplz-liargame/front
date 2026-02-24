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

  // roomCode는 전역 상태에서 관리하지만 modal에서 표시하는 inputValue는 굳이 상태로 관리할 필요 없이 props로 가져오기만 하면 됨
  // 문제 : 전역 상태인 roomcode는 초기화되지만 inputValue는 기존 값이 유지되어 이전 roomCode가 표시됨
  // 해결 : roomCode를 초기화하고 modal을 다시 열면 inputValue도 함께 리렌더되어 최신 값이 표시됨
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
