import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const MyTasks = ({ task }) => {
  return (
    <div>
      
      <div className="h-[750px] overflow-auto space-y-3">
        <div
          key={task._id}
          className="bg-secondary/10 rounded-md p-3 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <img
              src={task.assignToPhoto}
              alt={task.assignTo}
              className="h-8 w-8 rounded-full border"
            />
            <div>
              <h1 className="text-lg font-semibold">{task.title}</h1>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="grid place-content-center" title="Details">
              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
            </button>
            <button className="grid place-content-center" title="Done">
              <CheckIcon className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
