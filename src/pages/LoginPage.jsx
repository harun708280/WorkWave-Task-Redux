import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleSignIn, loginUser } from "../redux/features/user/userSlice";

const LoginPage = () => {
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {email,load,isLoading}=useSelector((state)=>state.userSlice)
  const navigate=useNavigate()

  const onSubmit = ({username,password}) => {
    console.log(username,password);
    
    dispatch(loginUser({username,password}))
  };

  const handleGoogle=()=>{
    dispatch(googleSignIn())
  }

 if ( email) {
  navigate('/')
 }

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
          <button
            type="submit"
            disabled={load===true}
            className="bg-primary text-white w-full p-2 rounded-md flex items-center justify-center"
          >
            {load ? (
              <div className="flex items-center gap-2 justify-center">
                <svg
                className="w-5 h-5 text-center flex items-center gap-2 justify-center animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25 flex items-center gap-2 justify-center"
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
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <button onClick={handleGoogle} className="bg-black  text-white w-full p-2 mt-3 rounded-md hover:bg-gray-800">
          {
            load?<svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>:<div className="flex items-center gap-2 justify-center">
          <FcGoogle /> Sign in with Google
          </div>
          }
          
        </button>
        <p className="text-white mt-3">
          Not a member yet? <Link to={'/auth'}  className="text-blue-300">Register</Link> 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;