import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from "../../store/actions/userAction";
import { toast } from "react-toastify";

const UserProfile = () => {
  const {
    userReducer: { users },
  } = useSelector((state) => state);
  console.log(users);

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const UpadateUserHandler = (product) => {
    dispatch(asyncUpdateUser(users.id, product));
    toast.success("userprofile updated successfully !");
    
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteUser(users.id));
    toast.success("userprofile deleted successfully !");
    naviagte("/login");
  };

  const LogoutUserHandler = () => {
    dispatch(asyncLogoutUser());
    toast.success("user logged out!");
    naviagte("/login");
  };

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: users?.username,
      email: users?.email,
      password: users?.password,
    },
  });

  return users ? (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(UpadateUserHandler)}
        className="flex flex-col w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 gap-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 tracking-wide">
          👤 User Profile
        </h2>
        <p className="text-center text-gray-500 mb-2">
          Update your details, logout, or delete your account.
        </p>

        <input
          {...register("username")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          type="text"
          placeholder="Username"
        />

        <input
          {...register("email")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          type="email"
          placeholder="Email"
        />

        <input
          {...register("password")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          type="password"
          placeholder="Password"
        />

        <button className="px-7 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105">
          Update User
        </button>

        <button
          type="button"
          onClick={LogoutUserHandler}
          className="px-7 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
        >
          Logout User
        </button>

        <button
          type="button"
          onClick={DeleteHandler}
          className="px-7 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
        >
          Delete User
        </button>
      </form>
    </div>
  ) : (
    "Loading..."
  );
};

export default UserProfile;
