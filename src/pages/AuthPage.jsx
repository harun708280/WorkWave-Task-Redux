import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/features/user/userSlice";

const RegisterPage = () => {
  const {isLoading,name,email}=useSelector((state)=>state.userSlice)
  console.log(email);
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = ({email,password}) => {
    dispatch(createUser({email,password}))
    reset()
   
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-10  px-6 py-4 rounded-2xl text-center w-96 backdrop-blur-md">
        <h2 className="text-white text-2xl font-bold">Registration WorkWave</h2>
        <p className="text-white text-sm mb-4">Create your account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 rounded-md outline-none"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 rounded-md outline-none"
              {...register("image")}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-md outline-none"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="bg-primary text-white w-full p-2 rounded-md">
            Register
          </button>
        </form>
        
        <p className="text-white mt-3">
          Already have an account? <a href="/login" className="text-blue-300">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;