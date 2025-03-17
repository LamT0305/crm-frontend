import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/CloseIcon";
import useNote from "../../hooks/useNote";

function NoteForm({ setOpenForm, customerId, noteId, setNoteId }) {
  const { note, handleAddNote, handleGetNoteById } = useNote();

  const onCloseForm = () => {
    setOpenForm(false);
    setNoteId(null);
  };

  useEffect(() => {
    if (noteId) {
      handleGetNoteById(noteId);
    }
  }, [noteId]);

  useEffect(() => {
    if (note && noteId) {
      setTitle(note.title);
      setDescription(note.content);
    }
  }, [note]);
  const textAreaRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("content", description);
    form.append("customerId", customerId);

    handleAddNote(form);

    setTitle("");
    setDescription("");
    onCloseForm();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/10 z-100">
      <div className="bg-white p-6 rounded-xl w-150">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Create note</p>
          <div onClick={() => onCloseForm()}>
            <CloseIcon
              className={
                "w-6 h-6 hover:bg-gray-200 p-1 rounded-md cursor-pointer"
              }
            />
          </div>
        </div>
        {/* input */}
        <form onSubmit={onSubmit}>
          <label className="flex flex-col text-sm text-gray-400 mt-5">
            Title:
            <input
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="bg-gray-100 text-black px-2 py-1 rounded-lg focus:outline-0 mt-3"
              placeholder="Enter title"
              required
            />
          </label>
          <label className="flex flex-col text-sm text-gray-400 mt-5">
            Desription:
            <textarea
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              ref={textAreaRef}
              type="text"
              className="w-full p-2 rounded-md text-md resize-none focus:outline-none bg-gray-100 text-black mt-3"
              rows="6"
              placeholder="Type your message here..."
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-1 mt-5 cursor-pointer active:bg-gray-400 active:text-black active:border-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
