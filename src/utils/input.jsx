import { useEffect } from "react";

export const InputChange = ({ text = "", setText, name, currentValue }) => {
  useEffect(() => {
    setText((prevData) => ({ ...prevData, [name]: currentValue || "" }));
  }, [currentValue, name, setText]);

  return (
    <input
      type="text"
      name={name}
      value={text || ""}
      onChange={(e) =>
        setText((prevData) => ({ ...prevData, [name]: e.target.value }))
      }
    />
  );
};
