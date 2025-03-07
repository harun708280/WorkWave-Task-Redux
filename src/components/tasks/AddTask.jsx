import React from "react";
import MyModal from "../Modal/Modal";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/features/taskSlice";
import { useGetAllUserQuery } from "../../redux/Api/userApi";
import { useCreateTaskMutation } from "../../redux/Api/taskApi";

const AddTask = ({ isOpen, setIsOpen }) => {
  const { data: users } = useGetAllUserQuery();
  const [createTask, { isLoading, data }] = useCreateTaskMutation();


  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await createTask(data);
    console.log(response);

    dispatch(addTask(data));

    reset();
  };
  const handleCancel = () => {
    reset();
    setIsOpen(false);
  };
  return (
    <div>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title={""}>
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg ">
          <h2 className="text-2xl font-bold mb-4 text-center">
            WorkWave Task Add
          </h2>
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
                {users?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
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
                {isLoading?<svg
                  aria-hidden="true"
                  class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>:'Create Task'}
                
              </button>
              <div role="status">
                
                
              </div>
            </div>
          </form>
        </div>
      </MyModal>
    </div>
  );
};

export default AddTask;
