import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncloginuser } from "../store/actions/userAction";
import { toast } from "react-toastify";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginHandler = (user) => {
    dispatch(asyncloginuser(user));
    toast.success("User logged in successfully!");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <form
        onSubmit={handleSubmit(LoginHandler)}
        className="flex flex-col bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Login to Your Account
        </h2>

        <input
          {...register("email")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Enter your email"
        />

        <input
          {...register("password")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500 font-medium hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
