import { User } from "../App";

interface ChatProps {
  data: User[];
  selectedRoom: boolean;
}

const ChatHandler = ({ data, selectedRoom }: ChatProps) => {
  const userName = window.sessionStorage.getItem("name");

  const roomMessage = data.filter((item) => item.room);
  const mainMessage = data.filter((item) => !item.room);
  const showMessage = selectedRoom ? roomMessage : mainMessage;
  return (
    <ul className="flex flex-col">
      {showMessage.map((el, index) => {
        return (
          <li
            key={index}
            className={el.name === userName ? "self-end" : "self-start"}
          >
            <p className="p-0 m-0 text-xs">{el.name}</p>
            <p
              className={
                el.name === userName
                  ? "bg-green-500  p-2 rounded-md  w-fit"
                  : "bg-blue-300  p-2 rounded-md  w-fit"
              }
            >
              {el.message}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatHandler;
