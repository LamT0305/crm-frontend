import CloseIcon from "../../assets/CloseIcon";
import BacklogIcon from "../../assets/BacklogIcon";
import TodoIcon from "../../assets/TodoIcon";
import InProgressIcon from "../../assets/InProgressIcon";
import DoneIcon from "../../assets/DoneIcon";
import CanceledIcon from "../../assets/CancelIcon";
import { useEffect, useRef, useState } from "react";
import useTask from "../../hooks/useTask";
import useActivity from "../../hooks/useActivity";

export const TaskForm = ({
  taskId,
  customerId,
  setOpenForm,
  userName,
  handleCreateTask,
  setTaskId,
}) => {
  const textAreaRef = useRef(null);
  const [status, setStatus] = useState("Backlog");
  const [sttDropdown, setSttDropdown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("Low");
  const [openPriority, setOpenPriority] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { task, handleGetTaskById, handleUpdateTask } = useTask();

  const { handleAddActivity } = useActivity();

  //get task

  useEffect(() => {
    if (taskId) {
      handleGetTaskById(taskId);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "Backlog");
      setPriority(task.priority || "Low");

      if (task.dueDate) {
        // Extract YYYY-MM-DD directly from dueDate string to prevent shifting
        const formattedDate = task.dueDate.split("T")[0];
        setDate(new Date(formattedDate));
      } else {
        setDate(new Date());
      }
    }
  }, [task]);

  const handleSubit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("customerId", customerId);
    form.append("title", title);
    form.append("description", description);
    form.append("dueDate", date);
    form.append("priority", priority);
    form.append("status", status);

    const activity = {
      customerId: customerId,
      type: "task",
      subject: "created a task",
    };
    if (taskId) {
      handleUpdateTask(taskId, form);
    } else {
      handleCreateTask(form);
    }

    if (customerId) {
      handleAddActivity(activity);
    }
    setOpenForm(false);
  };

  const onCloseForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Backlog");
    setPriority("Low");
    setDate(new Date());
    setOpenForm(false);
    setTaskId("");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/10 z-100">
      <div className="bg-white p-6 rounded-xl w-150">
        {/* header */}
        <div className="flex items-center justify-between ">
          {taskId ? (
            <>
              <p className="text-2xl font-semibold">Update Task</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold">Create Task</p>
            </>
          )}
          <div onClick={() => onCloseForm()}>
            <CloseIcon
              className={
                "w-6 h-6 hover:bg-gray-200 p-1 rounded-md cursor-pointer"
              }
            />
          </div>
        </div>
        {/* form input */}
        <form onSubmit={handleSubit}>
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
          <div className="flex items-center mt-5">
            {/* status */}
            <div className="relative mr-4">
              <div
                onClick={() => setSttDropdown(!sttDropdown)}
                className="flex items-center bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
              >
                <p>
                  {status === "Backlog" ? <BacklogIcon className={""} /> : null}
                  {status === "Todo" ? <TodoIcon className={""} /> : null}
                  {status === "InProgress" ? (
                    <InProgressIcon className={""} />
                  ) : null}
                  {status === "Completed" ? <DoneIcon className={""} /> : null}
                  {status === "Canceled" ? (
                    <CanceledIcon className={""} />
                  ) : null}
                </p>
                <p className="ml-2">{status}</p>
              </div>

              {sttDropdown && (
                <Status setStatus={setStatus} setOpenStatus={setSttDropdown} />
              )}
            </div>

            {/* leadOwner */}
            <p className="bg-gray-100 px-2 py-1 rounded-lg mr-4">{userName}</p>
            {/* date time picker */}
            <div>
              <CustomDatePicker date={date} setDate={setDate} />
            </div>

            {/* priority */}
            <div className="relative">
              <div
                onClick={() => setOpenPriority(!openPriority)}
                className="flex items-center bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
              >
                {priority === "Low" ? (
                  <p className="bg-green-500 rounded-2xl p-2"></p>
                ) : null}
                {priority === "Medium" ? (
                  <p className="bg-yellow-500 rounded-2xl p-2"></p>
                ) : null}
                {priority === "High" ? (
                  <p className="bg-red-500 rounded-2xl p-2"></p>
                ) : null}

                <p className="ml-2">{priority}</p>
              </div>

              {openPriority && (
                <Priority
                  setPriority={setPriority}
                  setOpenPriority={setOpenPriority}
                />
              )}
            </div>
          </div>

          {/* Submit */}
          {taskId ? (
            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg py-1 mt-5 cursor-pointer active:bg-gray-400 active:text-black active:border-white"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg py-1 mt-5 cursor-pointer active:bg-gray-400 active:text-black active:border-white"
            >
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const Status = ({ setStatus, setOpenStatus }) => {
  const handSetStatus = (status) => {
    setStatus(status);
    setOpenStatus(false);
  };

  return (
    <div className="border p-2 rounded-2xl border-gray-300 absolute bg-white top-full mt-2">
      {["Backlog", "Todo", "InProgress", "Completed", "Canceled"].map(
        (status) => (
          <div
            key={status}
            onClick={() => handSetStatus(status)}
            className="flex items-center hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
          >
            <span>
              {status === "Backlog" ? <BacklogIcon /> : null}
              {status === "Todo" ? <TodoIcon /> : null}
              {status === "InProgress" ? <InProgressIcon /> : null}
              {status === "Completed" ? <DoneIcon /> : null}
              {status === "Canceled" ? <CanceledIcon /> : null}
            </span>
            <p className="ml-2">{status}</p>
          </div>
        )
      )}
    </div>
  );
};

const Priority = ({ setPriority, setOpenPriority }) => {
  const handSetStatus = (priority) => {
    setPriority(priority);
    setOpenPriority(false);
  };

  return (
    <div className="border p-2 rounded-2xl border-gray-300 absolute bg-white top-full mt-2">
      {["Low", "Medium", "High"].map((priority) => (
        <div
          key={priority}
          onClick={() => handSetStatus(priority)}
          className="flex items-center hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
        >
          <span className="flex items-center">
            {priority === "Low" ? (
              <span className="bg-green-500 rounded-2xl p-2"></span>
            ) : null}
            {priority === "Medium" ? (
              <span className="bg-yellow-500 rounded-2xl p-2"></span>
            ) : null}
            {priority === "High" ? (
              <span className="bg-red-500 rounded-2xl p-2"></span>
            ) : null}
          </span>
          <p className="ml-2">{priority}</p>
        </div>
      ))}
    </div>
  );
};

const CustomDatePicker = ({ date, setDate }) => {
  return (
    <div className="bg-gray-100 px-2 py-1 rounded-lg cursor-pointer mr-4">
      <input
        type="date"
        value={
          date instanceof Date && !isNaN(date)
            ? date.toISOString().split("T")[0]
            : ""
        }
        onChange={(e) => setDate(new Date(e.target.value))}
        className="cursor-pointer"
      />
    </div>
  );
};
