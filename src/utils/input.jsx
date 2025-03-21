import { useEffect } from "react";

export const InputChange = ({ value, text, setText }) => {
  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <input
      className="px-3 py-1 bg-gray-100 rounded-xl text-md w-full"
      type="text"
      value={text || ""}
      onChange={(e) => onChange(e)}
      required
    />
  );
};
