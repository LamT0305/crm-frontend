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

  const onDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete note "${title}"?`)) {
      handleDeleteNote(id, customerId, title);
    }
  };

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden">
      {openForm && (
        <NoteForm
          setOpenForm={setOpenForm}
          customerId={customerId}
          noteId={noteId}
          setNoteId={setNoteId}
        />
      )}

      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <NoteIcon className="w-5 h-5 text-blue-500" />
              Notes
            </h2>
          </div>
          <button
            onClick={() => {
              setNoteId(null);
              setOpenForm(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <span>+</span>
            New Note
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-xl text-gray-400">
            <NoteIcon className="h-10 w-10" />
            No notes
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {notes.map((note) => (
              <div className="relative" key={note._id}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note._id, note.title);
                  }}
                  className="w-fit absolute top-2 right-2 z-10"
                >
                  <CloseIcon className="hover:bg-gray-200 h-6 w-6 p-1 cursor-pointer rounded-md" />
                </div>

                <div
                  onClick={() => handleOpenForm(note._id)}
                  className="flex flex-col justify-between border border-gray-300 shadow-lg rounded-xl p-4 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200 min-h-[250px] h-full"
                >
                  <div>
                    <p className="font-semibold text-lg break-words line-clamp-2 mb-3">
                      {note.title}
                    </p>
                    <div className="max-h-[120px] overflow-y-auto text-gray-700 break-words">
                      {note.content}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-gray-600 mt-4">
                    <p className="py-1 px-4 bg-gray-100 rounded-xl w-fit truncate max-w-full">
                      Mr. {note.customerId.firstName}
                    </p>
                    <p className="py-1 px-4 bg-gray-100 rounded-xl w-fit">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;
