import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { User } from "../App";

interface Props {
  socket: Socket;
}

const UsersOnline = ({ socket }: Props) => {
  const [connectedUser, setConnectedUser] = useState<User[]>([]);
  useEffect(() => {
    socket.on("user-list", (user) => {
      setConnectedUser(user);
    });
  }, [socket, connectedUser]);

  return (
    <div className=" m-2 w-2/12 ">
      <p className="text-center font-bold">Users online</p>
      <ul className="p-2">
        {connectedUser.map((user) => (
          <li key={user.userId}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersOnline;
