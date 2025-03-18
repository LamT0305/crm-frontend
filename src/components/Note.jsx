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
      <div className="flex items-center justify-between shadow-md py-2 px-8">
        <p className="font-bold text-lg">Notes</p>
        <p
          onClick={() => setOpenForm(true)}
          className="bg-black py-1 px-2 cursor-pointer rounded-xl text-white hover:bg-gray-200 hover:text-black"
        >
          + New note
        </p>
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
                  onClick={() => handleDeleteNote(note._id)}
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
