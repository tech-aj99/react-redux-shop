import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateProducts } from '../../store/actions/productAction';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CreateProductHandler = (product) => {
    product.id = nanoid();
    console.log(product);
    dispatch(asyncCreateProducts(product));
    reset(); // reset after submit
    toast.success("Product created successfully !");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(CreateProductHandler)}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-lg flex flex-col gap-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 tracking-wide">
          🛍️ Create New Product
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Fill in the details below to add your product.
        </p>

        <input
          {...register("image")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          type="url"
          placeholder="Image URL"
        />

        <input
          {...register("title")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          type="text"
          placeholder="Product Title"
        />

        <input
          {...register("price")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          type="number"
          placeholder="Price"
        />

        <textarea
          {...register("description")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition resize-none"
          placeholder="Product Description"
          rows="4"
        ></textarea>

        <input
          {...register("category")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          type="text"
          placeholder="Category"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transition transform hover:scale-105 duration-200"
        >
          🚀 Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
