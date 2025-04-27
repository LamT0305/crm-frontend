import React, { useEffect, useRef, useState } from "react";

function TagModal({ onClose, onSave }) {
  const [newTag, setNewTag] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newTag);
    onClose();
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg p-6 w-120 border border-gray-200 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Manage Tags</h2>

        {/* Tag Input */}
        <form
          className="flex flex-col w-full space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
              required
            />
            <input
              value="Add"
              type="submit"
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
            <p
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium cursor-pointer"
            >
              Cancel
            </p>
            <p
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer"
            >
              Save Changes
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TagModal;
