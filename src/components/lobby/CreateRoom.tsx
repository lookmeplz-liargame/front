"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";
import CreateRoomModal from "@/components/ui/CreateRoomModal";
import NickNameModal from "@/components/ui/NickNameModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateRoom({ open, onClose }: Props) {
  const router = useRouter();
  const [nicknameOpen, setNicknameOpen] = useState(false);

  const { roomCode, createRoom, addPlayer } = useGameStore();

  useEffect(() => {
    if (open) {
      createRoom();
    }
  }, [open, createRoom]);

  const handleConfirmRoom = () => {
    if (roomCode) setNicknameOpen(true);
  };

  const handleConfirmNickname = (nickname: string) => {
    addPlayer(nickname);
    setNicknameOpen(false);
    onClose();
    router.push("/game");
  };

  return (
    <>
      <CreateRoomModal
        open={open}
        roomCode={roomCode ?? ""}
        onClose={onClose}
        onConfirm={handleConfirmRoom}
      />

      <NickNameModal
        open={nicknameOpen}
        onClose={() => setNicknameOpen(false)}
        onConfirm={handleConfirmNickname}
      />
    </>
  );
}
