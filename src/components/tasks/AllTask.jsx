import React from "react";
import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const AllTask = ({ task }) => {
  // ✅ Status Colors
  const statusColors = {
    pending: "bg-yellow-500 text-white",
    running: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    archived: "bg-gray-500 text-white",
  };

  return (
    <div>
      <div className="mb-2 relative overflow-hidden bg-secondary/10 rounded-md border border-gray-200 shadow hover:shadow-lg transition-all ">
        <div className="absolute -right-7 rotate-45 top-2">
          <span
            className={`px-7 py-1 text-xs font-bold  ${
              statusColors[task.status]
            }`}
          >
            {task.status}
          </span>
        </div>

        <div
          key={task._id}
          className=" p-3 flex mt-5 gap-3 justify-between items-center "
        >
          <div className="flex items-center gap-3">
            <img
              src={task.assignToPhoto || "/default-avatar.png"}
              alt={task.assignTo || "Unassigned"}
              className="h-8 w-8 rounded-full border"
            />
            <div>
              <h1 className="text-sm font-semibold">{task.title}</h1>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </div>

          <div className="flex mr-2">
            <button
              className="grid place-content-center cursor-pointer"
              title="Details"
            >
              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTask;
