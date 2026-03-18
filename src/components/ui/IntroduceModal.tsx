"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/ModalButton";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GameGuideModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl text-black font-bold mb-6 text-center">
        게임 방법
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 bg-blue-50 rounded-lg px-4 py-3">
          <span className="text-blue-500 font-bold text-sm mt-0.5">시민</span>
          <span className="text-gray-600 text-sm">
            같은 단어를 받고 라이어를 찾아야 합니다.
          </span>
        </div>

        <div className="flex items-center gap-3 bg-red-50 rounded-lg px-4 py-3">
          <span className="text-red-500 font-bold text-sm whitespace-nowrap">
            라이어
          </span>
          <span className="text-gray-600 text-sm">
            카테고리만 알고 정답을 모릅니다. 들키지 마세요!
          </span>
        </div>

        <div className="flex items-center gap-3 bg-yellow-50 rounded-lg px-4 py-3">
          <span className="text-yellow-500 font-bold text-sm whitespace-nowrap">
            종료
          </span>
          <span className="text-gray-600 text-sm">
            라이어가 정확한 단어를 채팅에 입력하면 즉시 종료됩니다. ex. 야구!
            (x) 야구 (o)
          </span>
        </div>

        <div className="flex items-start gap-3 bg-green-50 rounded-lg px-4 py-3">
          <span className="text-green-500 font-bold text-sm mt-0.5">결과</span>
          <span className="text-gray-600 text-sm">
            게임 종료 시 라이어가 누구인지 공개됩니다.
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onClose}>확인</Button>
      </div>
    </Modal>
  );
}
