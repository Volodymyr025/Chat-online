import { useState } from "react";

interface ActionProps {
  title: string;
  buttonTitle: string;
  action: (value: string) => void;
}

const ActionField = ({ title, buttonTitle, action }: ActionProps) => {
  const [inputValue, setInputValue] = useState("");

  const actionHandler = () => {
    if (inputValue.trim().length <= 0) {
      return alert("Write some messages");
    }
    action(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex content-center items-center space-x-2 my-2">
      <p className="w-16">{title}</p>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        className="border rounded-md px-2 flex-1"
        type="text"
        value={inputValue}
      />
      <button
        className="w-20 bg-blue-400 px-2 rounded-md"
        onClick={actionHandler}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default ActionField;
