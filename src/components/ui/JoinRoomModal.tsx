"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  roomCode: string;
  onChangeRoomCode: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function JoinRoomModal({
  open,
  roomCode,
  onChangeRoomCode,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-center">방 입장</h2>

      <input
        value={roomCode}
        onChange={(e) => onChangeRoomCode(e.target.value)}
        className="w-full border rounded-md p-2 mb-4"
        placeholder="방 코드 입력"
      />

      <Button onClick={onConfirm}>입장</Button>
    </Modal>
  );
}
