import Button from "@/components/ui/Button";

interface LobbyActionProps {
  onCreate: () => void;
  onJoin: () => void;
}

export default function LobbyAction({ onCreate, onJoin }: LobbyActionProps) {
  return (
    <div className="space-y-3">
      <Button onClick={onCreate}>방 만들기</Button>
      <Button onClick={onJoin}>방 입장</Button>
    </div>
  );
}
