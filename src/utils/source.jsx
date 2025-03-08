import { useState } from "react";
import useSource from "../hooks/useSource";

export const Source = ({ sources, setFormData, setOpenSourceDropdown }) => {
  const { handleAddSource, handleDeleteSource } = useSource();

  const [newSource, setNewSource] = useState("");

  return (
    <div className="p-2 border border-gray-300 rounded-2xl bg-white max-h-50 overflow-auto">
      <dir className="flex items-center justify-between px-1 text-sm mb-2">
        <input
          type="text"
          value={newSource}
          required
          onChange={(e) => setNewSource(e.target.value)}
          placeholder="Add new source"
          className="p-1 rounded-lg bg-gray-200"
          onClick={(e) => e.stopPropagation()}
        />
        <p
          onClick={() => {
            handleAddSource(newSource);
            setNewSource("");
          }}
          className="bg-black text-white px-2 py-1 rounded-lg ml-2 cursor-pointer"
        >
          Add
        </p>
      </dir>

      {sources.map((i) => (
        <div key={i._id} className="flex items-center justify-between px-2">
          <p
            className="cursor-pointer rounded-xl hover:bg-gray-200 p-2 rounded w-[80%]"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                sourceId: { key: i._id, value: i.name },
              }));
              setOpenSourceDropdown(false);
            }}
          >
            {i.name}
          </p>
          <p
            onClick={() => {
              handleDeleteSource(i._id);
              setFormData((prev) => ({
                ...prev,
                sourceId: { key: "", value: "" },
              }));
            }}
            className="hover:bg-black hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm"
          >
            Del
          </p>
        </div>
      ))}
    </div>
  );
};
