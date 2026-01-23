"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  roomCode: string;
  onChangeRoomCode: (value: string) => void;
  onClose: () => void;
  onJoin: () => void;
}

export default function JoinRoomModal({
  open,
  roomCode,
  onChangeRoomCode,
  onClose,
  onJoin,
}: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const handleClickJoin = () => {
    const EXIST_ROOM_CODE = "12345"; // 임시

    if (roomCode !== EXIST_ROOM_CODE) {
      setToast("잘못된 코드입니다.");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    onJoin();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <h2 className="text-xl font-bold mb-4 text-center">방 입장</h2>

        <input
          value={roomCode}
          onChange={(e) => onChangeRoomCode(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
          placeholder="방 코드 입력"
        />

        <Button onClick={handleClickJoin}>입장</Button>
      </Modal>

      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
                        bg-black text-white px-4 py-2 rounded-full
                        text-sm shadow-lg
                        animate-toast"
        >
          {toast}
        </div>
      )}
    </>
  );
}
