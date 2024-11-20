import { Socket } from "socket.io-client";
import { User } from "../App";
import { useEffect, useState } from "react";
import ChatHandler from "./ChatHandler";

interface ChatProps {
  socket: Socket;
  room: string;
}

const Chat = ({ socket, room }: ChatProps) => {
  const [user, setUser] = useState<User[]>([]);
  const [roomSelect, setRoomSelect] = useState(false);

  useEffect(() => {
    socket.on("recive-message", (data) => {
      setUser([...user, data]);
    });
  }, [socket, user]);

  return (
    <div className="w-full px-2 pb-2 my-4 border border-black h-96 scroll-m-0 overflow-y-scroll relative">
      <div
        className={`border p-2 ${
          !roomSelect && "pb-3"
        } rounded-lg inline cursor-pointer shadow-md`}
        onClick={() => {
          setRoomSelect(false);
          socket.emit("toggle-room", room, "");
        }}
      >
        Main chat
      </div>
      <div
        className={`border ${
          roomSelect && "pb-3"
        } p-2 rounded-lg inline cursor-pointer shadow-md`}
        onClick={() => {
          setRoomSelect(true);
          socket.emit("toggle-room", "", room);
        }}
      >
        Room chat
      </div>
      {roomSelect && (
        <>
          <p className="text-center">
            Room:{room.length === 0 ? "Create room" : room}
          </p>
        </>
      )}
      <ChatHandler data={user} selectedRoom={roomSelect} />
    </div>
  );
};

export default Chat;
