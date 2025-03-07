import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!task.deadline) return;

    const updateCountdown = () => {
      const deadlineDate = new Date(task.deadline);
      const now = new Date();

      if (deadlineDate < now) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = differenceInDays(deadlineDate, now);
      const hours = differenceInHours(deadlineDate, now) % 24;
      const minutes = differenceInMinutes(deadlineDate, now) % 60;
      const seconds = differenceInSeconds(deadlineDate, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); 
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); 
  }, [task.deadline]);

  
  const statusColors = {
    pending: "bg-yellow-500 text-white",
    running: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    archived: "bg-gray-500 text-white",
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <h1
          className={`text-lg font-semibold ${
            task?.priority === "High" ? "text-red-500" : ""
          } ${task?.priority === "Medium" ? "text-yellow-500" : ""} ${
            task?.priority === "Easy" ? "text-green-500" : ""
          }`}
        >
          {task?.title}
        </h1>
        <span className={`px-3 py-1 text-xs font-bold rounded-md ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      <p className="text-gray-700 mt-2">{task?.description}</p>

     

      <div className="mt-4 flex flex-col ">
        <p className="text-sm text-gray-500">
          <span className="font-bold">Deadline:</span> {new Date(task.deadline).toLocaleString()}
        </p>
        <p className="text-sm text-red-500 font-semibold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {task?.assignToPhoto && (
          <img src={task.assignToPhoto} alt={task.assignTo} className="h-10 w-10 rounded-full border" />
        )}
        <div>
          <p className="text-sm text-gray-500">Assigned to</p>
          <p className="text-md font-semibold">{task.assignTo}</p>
          <p className="text-xs text-gray-400">{task.assignToEmail}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1">
          <TrashIcon className="h-4 w-4" /> Delete
        </button>
        {task?.status !== "archived" && (
          <button className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark flex items-center gap-1">
            <ArrowRightIcon className="h-4 w-4" /> Next Stage
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
