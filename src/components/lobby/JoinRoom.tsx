"use client";

import { useState } from "react";
import JoinRoomModal from "@/components/ui/JoinRoomModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JoinRoom({ open, onClose }: Props) {
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    if (!roomCode) return alert("방 코드 입력해라");
    console.log("방 입장:", roomCode);
    onClose();
  };

  return (
    <JoinRoomModal
      open={open}
      roomCode={roomCode}
      onChangeRoomCode={setRoomCode}
      onClose={onClose}
      onJoin={handleJoin}
    />
  );
}
