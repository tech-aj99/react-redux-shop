import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncDeleteProduct, asyncUpdateProduct } from "../../store/actions/productAction";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    productReducer: { products },
    userReducer: { users },
  } = useSelector((state) => state);

  const product = products?.find((product) => product.id == id);
  console.log(product, users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UpadateProductHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product));
    navigate("/");
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteProduct(id));
    navigate("/");
  };

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description,
    },
  });

  return product ? (
    <div className="flex flex-col md:flex-row gap-10 p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Product Preview */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transform hover:scale-[1.01] transition duration-300">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain mb-6 rounded-xl shadow-sm hover:scale-105 hover:rotate-1 transition duration-300"
        />
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          {product.title}
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          ${product.price}
        </h2>
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          {product.description}
        </p>
        <button className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition transform hover:scale-105 active:scale-95">
          Add to Cart
        </button>
      </div>

      {/* Admin Update Section */}
      {users && users?.isAdmin && (
        <form
          onSubmit={handleSubmit(UpadateProductHandler)}
          className="flex flex-col flex-1 bg-white rounded-2xl shadow-lg p-8 gap-5 transform hover:scale-[1.01] transition duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Update Product
          </h2>

          <input
            {...register("image")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="url"
            placeholder="Image URL"
          />

          <input
            {...register("title")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            placeholder="Title"
          />

          <input
            {...register("price")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="number"
            placeholder="Price"
          />

          <textarea
            {...register("description")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Description"
            rows="4"
          ></textarea>

          <input
            {...register("category")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            placeholder="Category"
          />

          <div className="flex gap-4 mt-2">
            <button className="flex-1 px-7 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition transform hover:scale-105 active:scale-95">
              Update Product
            </button>
            <button
              type="button"
              onClick={DeleteHandler}
              className="flex-1 px-7 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition transform hover:scale-105 active:scale-95"
            >
              Delete Product
            </button>
          </div>
        </form>
      )}
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-10 animate-pulse">
      Loading...
    </p>
  );
};

export default ProductDetails;
