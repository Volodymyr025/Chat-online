import Chat from "./components/Chat";
import ActionField from "./components/ActionField";
import { io } from "socket.io-client";
import UsersOnline from "./components/UsersOnline";
import { useState } from "react";

export interface User {
  userId: string;
  name: string;
  message: string;
  room: string;
}

const socket = io("https://socket-io-ngr4.onrender.com", {
  transports: ["websocket"],
});

const name = window.prompt("Whats your name?") || "User";
window.sessionStorage.setItem("name", name);

socket.emit("create-user", name);

function App() {
  const [room, setRoom] = useState("");
  const sendMessage = (value: string) => {
    socket.emit("send", {
      userId: socket.id,
      name: name,
      message: value,
    });
  };
  const joinRoom = (value: string) => {
    socket.emit("join-room", value);
    setRoom(value);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", room);
    setRoom("");
  };

  return (
    <main className="p-4">
      <div className="flex">
        <UsersOnline socket={socket} />
        <Chat socket={socket} room={room} />
      </div>

      <ActionField title="Message:" buttonTitle="Send" action={sendMessage} />

      {room && room.length > 0 ? (
        <button
          onClick={leaveRoom}
          className="w-full text-center bg-red-500 rounded-lg p-2"
        >
          Leave room
        </button>
      ) : (
        <ActionField title="Room:" buttonTitle="Join" action={joinRoom} />
      )}
    </main>
  );
}

export default App;
