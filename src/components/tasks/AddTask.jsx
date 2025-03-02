import React from "react";
import MyModal from "../Modal/Modal";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/features/taskSlice";

const AddTask = ({ isOpen, setIsOpen }) => {
    const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(addTask(data))
   
    
    reset();
  };
  const handleCancel = () => {
    reset();
    setIsOpen(false);
  };
  return (
    <div>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={""}
      >
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg ">
          <h2 className="text-2xl font-bold mb-4 text-center">WorkWave  Task Add</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium">Deadline</label>
              <input
                type="date"
                {...register("deadline", { required: "Deadline is required" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            {/* Assign To */}
            <div>
              <label className="block text-sm font-medium">Assign To</label>
              <select
                {...register("assignTo", {
                  required: "Please select a person",
                })}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Person</option>
                <option value="Harun">Harun</option>
                <option value="Atiya">Atiya</option>
                <option value="Rahim">Rahim</option>
                <option value="Karim">Karim</option>
              </select>
              {errors.assignTo && (
                <p className="text-red-500 text-sm">
                  {errors.assignTo.message}
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                {...register("priority", { required: "Select priority level" })}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Easy">Easy</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-12">
              <a
                onClick={handleCancel}
                className="w-full bg-red-700 text-white p-2 rounded text-center"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </MyModal>
    </div>
  );
};

export default AddTask;
