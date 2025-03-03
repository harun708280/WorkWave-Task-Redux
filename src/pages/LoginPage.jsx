import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 p-6 py-4 rounded-2xl text-center w-96 backdrop-blur-md">
        <div className="flex justify-center items-center">
        <img src="/User.png" className="h-[70px] w-[70px] " alt="" />
        </div>
        <h2 className="text-white text-xl font-bold">Login WorkWave</h2>
        <p className="text-white text-sm mb-4">Please enter your login and password</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full p-2 rounded-md outline-none"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
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
            Login
          </button>
        </form>
        <button className="bg-black flex items-center gap-2 justify-center text-white w-full p-2 mt-3 rounded-md hover:bg-gray-800">
          <FcGoogle /> Sign in with Google
        </button>
        <p className="text-white mt-3">
          Not a member yet? <Link to={'/auth'}  className="text-blue-300">Register</Link> 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;