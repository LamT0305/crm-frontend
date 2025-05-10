import React from "react";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/Toastify";
import axios from "axios";

function Feedback() {
  const [text, setText] = React.useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user || !user.email) {
      alert("Please log in to submit feedback.");
      return;
    }
    if (text.trim() === "") {
      alert("Please enter your feedback.");
      return;
    }
    try {
      const res = await axios.post(
        "https://admin.leadmastercrm.pro/api/v1/feedback",
        {
          email: user.email,
          feedback: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        notify.success("Feedback submitted successfully!");
        setText("");
      } else {
        notify.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      notify.error("Error submitting feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Feedback & Suggestions
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-600 font-medium mb-2">Help us improve!</p>
            <p className="text-gray-600">
              Your feedback is valuable to us. Share your thoughts, suggestions,
              or report any issues you've encountered.
            </p>
          </div>

          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="5"
              placeholder="Type your feedback here..."
              className="w-full h-52 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <div className="flex items-center justify-end">
              <button
                onClick={() => handleSubmit()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
