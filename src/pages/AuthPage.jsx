import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/features/user/userSlice";
import logo from '../assets/image/logo.png';
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/Api/userApi";

const RegisterPage = () => {
  const { isLoading, name, email, load } = useSelector(
    (state) => state.userSlice
  );

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [registerUser, { isSuccess }] = useRegisterUserMutation();
  const [imageUploading, setImageUploading] = useState(false);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setImageUploading(true);
      const response = await fetch("https://api.imgbb.com/1/upload?key=2a9bcf84d4334dcac7a2729bb6336536", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImageUploading(false);
      return data.success ? data.data.url : null;
    } catch (error) {
      setImageUploading(false);
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async ({ email, password, username, imageFile }) => {
    try {
      const imageUrl = imageFile[0] ? await uploadImage(imageFile[0]) : null;
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }

      dispatch(createUser({ email, password, username, image: imageUrl }));
      const response = await registerUser({
        name: username,
        email: email,
        photo: imageUrl,
      }).unwrap();
      console.log(response);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (email) {
    navigate("/");
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 px-6 py-4 rounded-2xl text-center w-96 backdrop-blur-md">
        <h2 className="text-white text-xl font-bold flex gap-2 items-center">
          <img src={logo} alt="logo" />Registration WorkWave
        </h2>
        <p className="text-white text-sm mb-4">Create your account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 rounded-md outline-none"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
           
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-primary rounded-md outline-none bg-white text-gray-900"
              {...register("imageFile", { required: "Image is required" })}
            />
            {errors.imageFile && (
              <p className="text-red-400 text-sm mt-1">{errors.imageFile.message}</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-md outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={load === true || imageUploading}
            className="bg-primary text-white w-full p-2 rounded-md flex items-center justify-center"
          >
            {load || imageUploading ? (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-white mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;