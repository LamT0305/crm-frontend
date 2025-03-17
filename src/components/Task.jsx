import React, { useEffect, useRef, useState } from "react";
import useTask from "../hooks/useTask";
import CheckmarkIcon from "../assets/CheckmarkIcon";
import { TaskForm } from "./form/TaskForm";
import BacklogIcon from "../assets/BacklogIcon";
import TodoIcon from "../assets/TodoIcon";
import InProgressIcon from "../assets/InProgressIcon";
import DoneIcon from "../assets/DoneIcon";
import CanceledIcon from "../assets/CancelIcon";
import CloseIcon from "../assets/CloseIcon";

function Task({ customerId, user }) {
  const {
    isLoading,
    tasks,
    handleGetTasksOfCustomer,
    handleAddTask,
    handleDeleteTask,
  } = useTask();
  const [openForm, setOpenForm] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    if (customerId) {
      handleGetTasksOfCustomer(customerId);
    }
  }, [customerId]);

  const formatDate = (date) => {
    const utcDate = new Date(date);
    const day = String(utcDate.getUTCDate()).padStart(2, "0");
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    const year = utcDate.getUTCFullYear();

    return `${day}/${month}/${year}`; // Format as "DD/MM/YYYY"
  };
  return (
    <div className="bg-white h-full flex flex-col relative">
      {openForm && (
        <TaskForm
          taskId={taskId}
          setTaskId={setTaskId}
          setOpenForm={setOpenForm}
          customerId={customerId}
          userName={user.name}
          handleCreateTask={handleAddTask}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between shadow-md py-2 px-8">
        <p className="font-bold text-lg">Tasks</p>
        <p
          onClick={() => setOpenForm(true)}
          className="bg-black py-1 px-2 cursor-pointer rounded-xl text-white hover:bg-gray-200 hover:text-black"
        >
          + New task
        </p>
      </div>

      {/* body */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-2xl text-gray-400">
          <CheckmarkIcon className="w-10 h-10 text-gray-400" />
          No tasks
        </div>
      ) : (
        <div className="px-10 py-8 max-h-[clamp(200px,75vh,75vh)] overflow-auto">
          {tasks.map((task) => (
            <div
              key={task._id}
              className=" mb-8 bg-gray-100 hover:bg-gray-300 px-6 py-3 rounded-xl cursor-pointer flex justify-between items-center"
            >
              <div
                onClick={() => {
                  setTaskId(task._id);
                  setOpenForm(true);
                }}
                className="w-[90%]"
              >
                <p className="font-bold text-sm">{task.title}</p>
                <p className="text-md py-2">{task.description}</p>
                <div className="flex items-center">
                  {/* status */}
                  <div className="flex items-center bg-white mr-4 text-xs text-gray-500 px-2 py-1 rounded-lg">
                    <p>
                      {task.status === "Backlog" ? (
                        <BacklogIcon className={""} />
                      ) : null}
                      {task.status === "Todo" ? (
                        <TodoIcon className={""} />
                      ) : null}
                      {task.status === "InProgress" ? (
                        <InProgressIcon className={""} />
                      ) : null}
                      {task.status === "Completed" ? (
                        <DoneIcon className={""} />
                      ) : null}
                      {task.status === "Canceled" ? (
                        <CanceledIcon className={""} />
                      ) : null}
                    </p>
                    <p className="ml-2">{task.status}</p>
                  </div>
                  {/* priority */}
                  <div className="flex items-center bg-white mr-4 text-xs text-gray-500 px-2 py-1 rounded-lg">
                    {task.priority === "Low" ? (
                      <p className="bg-green-500 rounded-2xl p-2"></p>
                    ) : null}
                    {task.priority === "Medium" ? (
                      <p className="bg-yellow-500 rounded-2xl p-2"></p>
                    ) : null}
                    {task.priority === "High" ? (
                      <p className="bg-red-500 rounded-2xl p-2"></p>
                    ) : null}

                    <p className="ml-2">{task.priority}</p>
                  </div>
                  {/* dueDate */}
                  <p className="bg-white mr-4 text-xs text-gray-500 px-2 py-1 rounded-lg">
                    {formatDate(task.dueDate)}
                  </p>
                </div>
              </div>
              <p
                onClick={() => handleDeleteTask(task._id)}
                className="bg-white mr-4 text-xs text-gray-500 p-1 rounded-lg hover:bg-red-400 hover:text-white"
              >
                <CloseIcon />
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Task;
