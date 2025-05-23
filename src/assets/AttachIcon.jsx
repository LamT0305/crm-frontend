import React, { useRef } from "react";

const AttachIcon = ({ onFilesSelect }) => {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    let files = Array.from(event.target.files); // Convert FileList to Array

    if (files.length > 5) {
      files = files.slice(0, 5); // Limit to 5 files
      alert("You can only select up to 5 files.");
    }

    if (files.length > 0) {
      onFilesSelect(files);
    }
  };

  return (
    <div>
      {/* Hidden input for multiple file selection */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple // Enable multiple file selection
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.zip"
      />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-black font-semibold bg-gray-300 p-1 rounded-md cursor-pointer hover:text-gray-200"
        onClick={handleIconClick}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5684 2.50774C11.5403 1.49742 9.95026 1.49742 8.92215 2.50774L3.62404 7.71417C2.12532 9.18695 2.12532 11.669 3.62404 13.1418C5.12762 14.6194 7.66861 14.6194 9.17219 13.1418L12.1609 10.2049C12.3578 10.0113 12.6744 10.0141 12.8679 10.211C13.0615 10.408 13.0587 10.7246 12.8618 10.9181L9.8731 13.8551C7.98045 15.715 4.81578 15.715 2.92313 13.8551C1.02562 11.9904 1.02562 8.86558 2.92313 7.00091L8.22124 1.79449C9.63842 0.401838 11.8521 0.401838 13.2693 1.79449C14.6914 3.19191 14.6914 5.38225 13.2693 6.77968L8.37876 11.5189C7.51767 12.3638 6.11144 12.3939 5.29119 11.5097C4.43611 10.6596 4.40778 9.26893 5.30922 8.46081L7.33823 6.46692C7.53518 6.27337 7.85175 6.27613 8.04531 6.47309C8.23886 6.67005 8.23609 6.98662 8.03913 7.18017L6.0014 9.18264C5.5391 9.59243 5.5104 10.3231 6.0014 10.8056C6.42299 11.2649 7.18224 11.2926 7.67785 10.8056L12.5684 6.06643C13.5917 5.05969 13.5913 3.51289 12.5684 2.50774Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default AttachIcon;
