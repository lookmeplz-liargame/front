"use client";

import { useState } from "react";
import CreateRoomModal from "@/components/ui/CreateRoomModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateRoom({ open, onClose }: Props) {
  const handleCreate = () => {
    console.log("방 코드 넣어도 ㄱㄴ?");
    onClose();
  };

  return (
    <CreateRoomModal open={open} onClose={onClose} onCreate={handleCreate} />
  );
}
