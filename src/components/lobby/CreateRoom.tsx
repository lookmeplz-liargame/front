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
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);

  const { createRoom, createNickname, joinRoom } = useGameStore();

  useEffect(() => {
    if (open) {
      (async () => {
        const roomId = await createRoom();
        setCreatedRoomId(roomId);
      })();
    }
  }, [open]);

  const handleConfirmRoom = () => {
    if (createdRoomId) {
      setNicknameOpen(true);
    }
  };

  const handleConfirmNickname = async (nickname: string) => {
    if (!createdRoomId) return;

    const token = await createNickname(nickname);
    if (!token) return;

    const success = await joinRoom(createdRoomId);
    if (!success) return;

    setNicknameOpen(false);
    onClose();
    router.push("/game");
  };

  return (
    <>
      <CreateRoomModal
        open={open}
        roomCode={createdRoomId ?? ""}
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
