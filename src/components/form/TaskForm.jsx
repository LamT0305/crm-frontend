import CloseIcon from "../../assets/CloseIcon";
import BacklogIcon from "../../assets/BacklogIcon";
import TodoIcon from "../../assets/TodoIcon";
import InProgressIcon from "../../assets/InProgressIcon";
import DoneIcon from "../../assets/DoneIcon";
import CanceledIcon from "../../assets/CancelIcon";
import { useEffect, useRef, useState } from "react";
import useTask from "../../hooks/useTask";
import useUser from "../../hooks/useUser";
import { useAuth } from "../../context/AuthContext";

export const TaskForm = ({
  taskId,
  customerId,
  userName,
  setOpenForm,
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
  const { handleGetWorkspaceUsers, users, loading } = useUser();
  const { user: me } = useAuth();
  const [viewListUser, setViewListUser] = useState(false);
  const [Assignee, setAssignee] = useState("");
  const [errorAssignee, setErrorAssignee] = useState("");

  const taskRef = useRef(null);
  const workspaceRef = useRef(null);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (taskRef.current && !taskRef.current.contains(e.target)) {
        setOpenForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      // Add null check for assignee
      setAssignee(task.assignee ? task.assignee : "");

      if (task.dueDate) {
        const localDate = new Date(task.dueDate);
        setDate(localDate);
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
    form.append("assignee", Assignee._id);
    // handle update task o
    if (taskId) {
      handleUpdateTask(taskId, form, customerId);
    } else {
      if (!Assignee) {
        setErrorAssignee("Please select an assignee");
        return;
      }
      handleCreateTask(form, customerId);
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
      <div ref={taskRef} className="bg-white p-6 rounded-xl w-150">
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
              className="w-full p-2 rounded-md text-md resize-none focus:outline-none bg-gray-100 text-black mt-3 whitespace-pre-wrap"
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
                  {status === "Backlog" ? (
                    <BacklogIcon className={"w-4 h-4"} />
                  ) : null}
                  {status === "Todo" ? (
                    <TodoIcon className={"w-4 h-4"} />
                  ) : null}
                  {status === "InProgress" ? (
                    <InProgressIcon className={"w-4 h-4"} />
                  ) : null}
                  {status === "Completed" ? (
                    <DoneIcon className={"w-4 h-4"} />
                  ) : null}
                  {status === "Canceled" ? (
                    <CanceledIcon className={"w-4 h-4"} />
                  ) : null}
                </p>
                <p className="ml-2">{status}</p>
              </div>

              {sttDropdown && (
                <Status setStatus={setStatus} setOpenStatus={setSttDropdown} />
              )}
            </div>

            {/* Assignee */}
            <div className="relative">
              <div className="relative">
                <p
                  onClick={() => setViewListUser(true)}
                  className="bg-gray-100 px-2 py-1 rounded-lg mr-4 cursor-pointer"
                >
                  {Assignee.name || "Select Assignee"}
                </p>
                {errorAssignee && !Assignee && (
                  <p className="text-red-500 text-sm mt-1 absolute bottom-full w-50 bg-white border px-2 rounded-md mb-2">
                    {errorAssignee}
                  </p>
                )}
              </div>

              {viewListUser && (
                <WorkspaceUsers
                  users={users}
                  getUsers={handleGetWorkspaceUsers}
                  open={viewListUser}
                  setOpen={setViewListUser}
                  isLoading={loading}
                  setAssignee={setAssignee}
                  ref={workspaceRef}
                  me={me}
                />
              )}
            </div>

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
              {status === "Backlog" ? (
                <BacklogIcon className={"w-4 h-4"} />
              ) : null}
              {status === "Todo" ? <TodoIcon className={"w-4 h-4"} /> : null}
              {status === "InProgress" ? (
                <InProgressIcon className={"w-4 h-4"} />
              ) : null}
              {status === "Completed" ? (
                <DoneIcon className={"w-4 h-4"} />
              ) : null}
              {status === "Canceled" ? (
                <CanceledIcon className={"w-4 h-4"} />
              ) : null}
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
  // Get today's date in local timezone
  const today = new Date();
  const todayStr =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  return (
    <div className="bg-gray-100 px-2 py-1 rounded-lg cursor-pointer mr-4">
      <input
        type="date"
        min={todayStr}
        value={
          date instanceof Date && !isNaN(date)
            ? date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(date.getDate()).padStart(2, "0")
            : ""
        }
        onChange={(e) => setDate(new Date(e.target.value))}
        className="cursor-pointer bg-transparent outline-none"
      />
    </div>
  );
};

const WorkspaceUsers = ({
  users,
  getUsers,
  open,
  setOpen,
  isLoading,
  setAssignee,
  ref,
  me,
}) => {
  const [Array, setArray] = useState([]);
  useEffect(() => {
    if (open) {
      getUsers();
    }
  }, [open]);

  useEffect(() => {
    if (users && me) {
      // Check if current user is already in the users array
      const isCurrentUserIncluded = users.some((user) => user._id === me._id);
      if (!isCurrentUserIncluded) {
        setArray([...users, me]);
      } else {
        setArray(users);
      }
    }
  }, [users, me]);

  const onSelectAssignee = (user) => {
    setOpen(false);
    setAssignee(user);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div
      ref={ref}
      className="absolute bg-white top-full mt-2 border border-gray-200 rounded-lg shadow-lg p-2 min-w-[250px] z-50"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        Array && (
          <div className="max-h-[200px] overflow-y-auto">
            {Array.map((user) => (
              <div
                onClick={() => onSelectAssignee(user)}
                key={user._id}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center gap-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium overflow-hidden">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700">{user.name}</span>
              </div>
            ))}
          </div>
        )
      )}
      {users && users.length === 0 && (
        <div className="text-gray-500 text-center py-2">No users found</div>
      )}
    </div>
  );
};
