"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (nickname: string) => void;
}

export default function NickNameModal({ open, onClose, onConfirm }: Props) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    const trimmed = nickname.trim();

    if (!trimmed) {
      setError("닉네임을 입력하세요.");
      return;
    }

    onConfirm(trimmed);
    setNickname("");
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-center">닉네임 입력</h2>

      <input
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
          setError("");
        }}
        placeholder="닉네임 입력"
        className="w-full border rounded-md p-2 mb-3"
      />

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      <Button onClick={handleConfirm}>확인</Button>
    </Modal>
  );
}
