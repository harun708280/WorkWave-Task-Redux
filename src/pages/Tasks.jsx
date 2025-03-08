import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MyTasks from "../components/tasks/MyTasks";
import TaskCard from "../components/tasks/TaskCard";
import MyModal from "../components/Modal/Modal";
import { useEffect, useState } from "react";
import AddTask from "../components/tasks/AddTask";
import { useSelector } from "react-redux";
import MenuDropDown from "../components/Modal/DropDwonMenu";
import { useGetAllUserQuery, useGetUserByEmailQuery } from "../redux/Api/userApi";
import Loading from "../components/layouts/Loading";
import {
  useGetAllTaskQuery,
  useGetStatusTaskQuery,
} from "../redux/Api/taskApi";
import AllTask from "../components/tasks/AllTask";

const Tasks = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { task } = useSelector((state) => state.allTasks);
  const { email, photo } = useSelector((state) => state.userSlice);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: allTasks, isLoading: allTaskLoading } = useGetAllTaskQuery();
  const { data: statusTasks, isLoading: statusTaskLoading } =
    useGetStatusTaskQuery(selectedStatus);
  console.log(statusTasks);

  const displayedTasks = selectedStatus === "all" ? allTasks : statusTasks;

  const { data: user, isError, isLoading } = useGetUserByEmailQuery(email);
  const {data:allUSers}=useGetAllUserQuery()
  console.log(allUSers);
  

  if (allTaskLoading) {
    return <Loading></Loading>;
  }

  const pending = allTasks.filter((item) => item.status === "pending");
  const running = allTasks.filter((item) => item.status === "running");
  const complete = allTasks.filter((item) => item.status === "completed");

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-9 px-10 pt-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-3xl">📂 WorkWave Tasks </h1>
          </div>
          <div className="flex gap-5">
            <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
              <BellIcon className="h-6 w-6" />
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              Add Task
            </button>
            <AddTask isOpen={isOpen} setIsOpen={setIsOpen}></AddTask>
            <MenuDropDown email={user?.email}>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src={user?.photo}
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
            </MenuDropDown>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10">
          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1 className="font-bold uppercase text-sm">Up Next</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {pending.length}
              </p>
            </div>
            <div className="space-y-3">
              {pending.map((item) => (
                <TaskCard
                  key={item._id}
                  task={{
                    _id: item._id,
                    title: item.title,
                    description: item.description,
                    deadline: item.deadline,
                    priority: item.priority,
                    assignTo: item.assignTo ? item.assignTo.name : "Unassigned",
                    assignToEmail: item.assignTo
                      ? item.assignTo.email
                      : "Unassigned",
                    assignToPhoto: item.assignTo
                      ? item.assignTo.photo
                      : "Unassigned",

                    status: item.status,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1 className="font-bold uppercase text-sm">In Progress</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {running.length}
              </p>
            </div>
            <div className="space-y-3">
              {running.map((item) => (
                <TaskCard
                  key={item.id}
                  task={{
                    _id: item._id,
                    title: item.title,
                    description: item.description,
                    deadline: item.deadline,
                    priority: item.priority,
                    assignTo: item.assignTo ? item.assignTo.name : "Unassigned",
                    assignToEmail: item.assignTo
                      ? item.assignTo.email
                      : "Unassigned",
                    assignToPhoto: item.assignTo
                      ? item.assignTo.photo
                      : "Unassigned",
                    status: item.status,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky  top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1 className="font-bold uppercase text-sm">Completed</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {complete.length}
              </p>
            </div>
            <div className="space-y-3">
              {complete.map((item) => (
                <TaskCard
                  key={item.id}
                  task={{
                    _id: item._id,
                    title: item.title,
                    description: item.description,
                    deadline: item.deadline,
                    priority: item.priority,
                    assignTo: item.assignTo ? item.assignTo.name : "Unassigned",
                    assignToEmail: item.assignTo
                      ? item.assignTo.email
                      : "Unassigned",
                    assignToPhoto: item.assignTo
                      ? item.assignTo.photo
                      : "Unassigned",
                    status: item.status,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 sticky top-0 border-l-2 border-secondary/20 px-10 pt-10">
        <div>
          <h1 className="text-xl">Members</h1>
          <div className="flex gap-3 mt-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3 mt-5">
          <h1 className="text-xl uppercase font-semibold">Tasks</h1>
          <select
            className="border px-3 py-1 rounded-md bg-white shadow"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        {displayedTasks.length === 0 && (
          <p className="text-gray-500 text-center mt-5">
            No tasks found for this category.
          </p>
        )}
        {statusTaskLoading ? (
          "Loading...."
        ) : (
          <div className="relative h-[800px] mt-5 overflow-auto pr-2">
            {displayedTasks?.map((item) => (
              <AllTask
                key={item._id}
                task={{
                  _id: item._id,
                  title: item.title,
                  description: item.description,
                  deadline: item.deadline,
                  priority: item.priority,
                  assignTo: item.assignTo ? item.assignTo.name : "Unassigned",
                  assignToEmail: item.assignTo
                    ? item.assignTo.email
                    : "Unassigned",
                  assignToPhoto: item.assignTo
                    ? item.assignTo.photo
                    : "Unassigned",
                  status: item.status,
                }}
              ></AllTask>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
