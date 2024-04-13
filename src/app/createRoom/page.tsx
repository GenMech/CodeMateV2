import { CreateRoomForm } from "./createRoomForm";

export default function CreateRoom() {
  return (
    <div className="container flex flex-col gap-7 pt-12 pb-12">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
