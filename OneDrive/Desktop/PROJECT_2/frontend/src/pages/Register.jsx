import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = true;
    user.cart = [];
    dispatch(asyncRegisterUser(user));
    toast.success("User registered in successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="flex flex-col bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>

        <input
          {...register("username")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Enter your username"
        />

        <input
          {...register("email")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="email"
          placeholder="Enter your email"
        />

        <input
          {...register("password")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="px-4 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link className="text-purple-500 font-medium hover:underline" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
