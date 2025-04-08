import React, { useEffect, useState } from "react";
import useNote from "../hooks/useNote";
import NoteIcon from "../assets/NoteIcon";
import NoteForm from "./form/NoteForm";
import CloseIcon from "../assets/CloseIcon";

function Note({ customerId }) {
  const { notes, handleGetCustomerNotes, handleDeleteNote } = useNote();
  const [openForm, setOpenForm] = useState(false);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    handleGetCustomerNotes(customerId);
  }, [customerId]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const handleOpenForm = (id) => {
    setNoteId(id);
    setOpenForm(true);
  };

  const onDelete = (id, content) => {
    handleDeleteNote(id, customerId, content);
  };
  return (
    <div className="bg-white h-full flex flex-col">
      {/* form */}

      {openForm && (
        <NoteForm
          setOpenForm={setOpenForm}
          customerId={customerId}
          noteId={noteId}
          setNoteId={setNoteId}
        />
      )}
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <NoteIcon className="w-5 h-5 text-blue-500" />
              Notes
            </h2>
          </div>

          <button
            onClick={() => setOpenForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-all duration-200
                     flex items-center gap-2 font-medium"
          >
            <span>+</span>
            New Note
          </button>
        </div>
      </div>

      {/* body */}

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-xl text-gray-400">
          <NoteIcon className={"h-10 w-10"} />
          No notes
        </div>
      ) : (
        <div className="flex flex-col h-full mt-5">
          <div className="max-h-[75vh] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto px-4">
            {notes.map((note) => (
              <div className="relative" key={note._id}>
                <div
                  onClick={() => onDelete(note._id, note.title)}
                  className="w-fit absolute top-2 right-2 z-100"
                >
                  <CloseIcon
                    className={
                      "hover:bg-gray-200 h-6 w-6 p-1 cursor-pointer rounded-md"
                    }
                  />
                </div>
                <div
                  onClick={() => handleOpenForm(note._id)}
                  className="flex flex-col justify-between border border-gray-300 shadow-lg rounded-xl p-4 bg-white cursor-pointer"
                >
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg w-[85%] break-words">
                      {note.title}
                    </p>
                  </div>

                  <p className="h-32 md:max-h-24 w-full break-words overflow-y-auto my-3 text-gray-700">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 md:flex-col md:items-start md:justify-start md:mt-2">
                    <p className="py-1 px-4 bg-gray-100 rounded-xl md:mb-2">
                      {"Mr. "}
                      {note.customerId.firstName}
                    </p>
                    <p className="py-1 px-4 bg-gray-100 rounded-xl">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
