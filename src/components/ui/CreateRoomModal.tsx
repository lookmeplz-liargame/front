import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export default function CreateRoomModal({ open, onClose, onCreate }: Props) {
  const roomCode = "12345";
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      showToast("방 코드 복사 완료");
    } catch {
      showToast("복사 실패");
    }
  };

  return (
    <>
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

      <Modal open={open} onClose={onClose}>
        <h2 className="text-xl font-bold mb-4 text-center">방 만들기</h2>

        <div className="flex items-center gap-2 mb-4">
          <input
            value={roomCode}
            readOnly
            className="flex-1 border rounded-md p-2 bg-gray-100 text-center font-mono"
          />
          <Button onClick={handleCopy}>복사</Button>
        </div>

        <Button onClick={onCreate} className="w-full">
          확인
        </Button>
      </Modal>
    </>
  );
}
