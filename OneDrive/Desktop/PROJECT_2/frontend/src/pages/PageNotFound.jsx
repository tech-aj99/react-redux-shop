import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#FDFBF5]">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Page Not Found !
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105 active:scale-95"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
