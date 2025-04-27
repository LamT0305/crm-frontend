import React, { useEffect, useRef, useState } from "react";
import useTask from "../../hooks/useTask";
import CheckmarkIcon from "../../assets/CheckmarkIcon";
import { TaskForm } from "../form/TaskForm";
import BacklogIcon from "../../assets/BacklogIcon";
import TodoIcon from "../../assets/TodoIcon";
import InProgressIcon from "../../assets/InProgressIcon";
import DoneIcon from "../../assets/DoneIcon";
import CanceledIcon from "../../assets/CancelIcon";
import CloseIcon from "../../assets/CloseIcon";
import useActivity from "../../hooks/useActivity";

function Task({ customerId, user }) {
  const {
    isLoading,
    tasks,
    handleGetTasksOfCustomer,
    handleAddTask,
    handleDeleteTask,
    handleFilterByStatus,
    handleSortTasks,
  } = useTask();
  const { handleAddActivity } = useActivity();
  const [openForm, setOpenForm] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    if (customerId) {
      handleGetTasksOfCustomer(customerId);
    }
  }, [customerId]);

  const formatDate = (date) => {
    const localDate = new Date(date);
    const day = String(localDate.getDate()).padStart(2, "0");
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const year = localDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onDelete = (id, content) => {
    handleDeleteTask(id);
    const activity = {
      customerId: customerId,
      type: "task",
      subject: "has deleted comment: " + '"' + content + '"',
    };
    handleAddActivity(activity);
  };

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden">
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
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CheckmarkIcon className="w-5 h-5 text-blue-500" />
              Tasks
            </h2>
          </div>

          <div className="flex items-center gap-30">
            {/* Sort */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                name="sort"
                className="bg-white px-2 py-1 rounded-lg text-sm text-gray-500 cursor-pointer border border-gray-300"
                onChange={(e) => handleSortTasks(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="dsc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3">
              <label htmlFor="filter" className="mr-2">
                Filter by:
              </label>
              <select
                id="filter"
                name="filter"
                className="bg-white px-2 py-1 rounded-lg text-sm text-gray-500 cursor-pointer border border-gray-300"
                onChange={(e) => handleFilterByStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="Backlog">Backlog</option>
                <option value="Todo">Todo</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            {/* Button */}
            <button
              onClick={() => setOpenForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <span>+</span>
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* body */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-2xl text-gray-400">
          <CheckmarkIcon className="w-10 h-10 text-gray-400" />
          No tasks
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl cursor-pointer flex justify-between items-start gap-4"
            >
              <div
                onClick={() => {
                  setTaskId(task._id);
                  setOpenForm(true);
                }}
                className="w-full"
              >
                <p className="font-bold text-sm">{task.title}</p>
                <p className="text-md py-2 whitespace-pre-wrap">
                  {task.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {/* status */}
                  <div className="flex items-center bg-white text-xs text-gray-500 px-2 py-1 rounded-lg">
                    <p>
                      {task.status === "Backlog" && (
                        <BacklogIcon className="w-4 h-4" />
                      )}
                      {task.status === "Todo" && (
                        <TodoIcon className="w-4 h-4" />
                      )}
                      {task.status === "InProgress" && (
                        <InProgressIcon className="w-4 h-4" />
                      )}
                      {task.status === "Completed" && (
                        <DoneIcon className="w-4 h-4" />
                      )}
                      {task.status === "Canceled" && (
                        <CanceledIcon className="w-4 h-4" />
                      )}
                    </p>
                    <p className="ml-2">{task.status}</p>
                  </div>

                  {/* priority */}
                  <div className="flex items-center bg-white text-xs text-gray-500 px-2 py-1 rounded-lg">
                    {task.priority === "Low" && (
                      <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                    )}
                    {task.priority === "Medium" && (
                      <span className="bg-yellow-500 rounded-full w-2 h-2 mr-2"></span>
                    )}
                    {task.priority === "High" && (
                      <span className="bg-red-500 rounded-full w-2 h-2 mr-2"></span>
                    )}
                    <p>{task.priority}</p>
                  </div>

                  {/* dueDate */}
                  <p className="bg-white text-xs text-gray-500 px-2 py-1 rounded-lg">
                    {formatDate(task.dueDate)}
                  </p>

                  {/* assignee */}
                  <p className="bg-white text-xs text-gray-500 px-2 py-1 rounded-lg">
                    {task.assignee.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(task._id, task.title)}
                className="bg-white text-xs text-gray-500 p-1 rounded-lg hover:bg-red-400 hover:text-white"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Task;
