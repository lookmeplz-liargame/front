"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import JoinRoomModal from "@/components/ui/JoinRoomModal";
import NickNameModal from "@/components/ui/NickNameModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JoinRoom({ open, onClose }: Props) {
  const router = useRouter();
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [nicknameOpen, setNicknameOpen] = useState(false);

  const { createNickname, joinRoom } = useGameStore();

  const handleJoin = () => {
    if (!roomCodeInput.trim()) {
      alert("방 코드를 입력하세요");
      return;
    }

    setNicknameOpen(true);
  };

  const handleConfirmNickname = async (nickname: string) => {
    const token = await createNickname(nickname);
    if (!token) return;

    const success = await joinRoom(roomCodeInput.trim());
    if (success === "NOT_FOUND") {
      alert("존재하지 않는 방입니다.");
      setNicknameOpen(false);
      return; // 방 입력으로 돌아감
    }
    if (!success) {
      alert("방 입장에 실패했습니다.");
      return;
    }

    setNicknameOpen(false);
    onClose();
    router.push("/game");
  };

  return (
    <>
      <JoinRoomModal
        open={open}
        roomCode={roomCodeInput}
        onChangeRoomCode={setRoomCodeInput}
        onClose={onClose}
        onConfirm={handleJoin}
      />

      <NickNameModal
        open={nicknameOpen}
        onClose={() => setNicknameOpen(false)}
        onConfirm={handleConfirmNickname}
      />
    </>
  );
}
