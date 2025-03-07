import React, { useEffect, useRef } from "react";
import close from "../assets/closeBtn.png";

const CreateLeadForm = ({ setIsOpen }) => {
  const createRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/10 ">
      <div
        ref={createRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl opacity-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Create Lead</h2>
          <img
            onClick={() => setIsOpen(false)}
            src={close}
            alt=""
            style={{
              width: 25,
              height: 25,
              padding: 5,
              backgroundColor: "grey",
              borderRadius: 10,
              filter: "invert(1)",
              cursor: "pointer",
            }}
          />
        </div>
        <form action="">
          <div className="grid grid-cols-3 gap-4 ">
            <label className="flex flex-col ">
              Last name
              <input
                required
                type="text"
                placeholder="Last Name"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              First name
              <input
                required
                type="text"
                placeholder="First Name "
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Email
              <input
                required
                type="email"
                placeholder="Email"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Mobile phone
              <input
                required
                type="text"
                placeholder="Mobile No"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Gender
              <input
                required
                type="text"
                placeholder="Gender"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>
          </div>
          <hr className="my-10" style={{ color: "lightgrey" }} />
          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col ">
              Monthly income
              <input
                required
                type="text"
                placeholder="Monthly income"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Source
              <input
                required
                type="text"
                placeholder="Source"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Industry
              <input
                required
                type="text"
                placeholder="Industry"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-black text-white opacity-100 px-4 py-1 rounded-xl mt-5 cursor-pointer">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadForm;
