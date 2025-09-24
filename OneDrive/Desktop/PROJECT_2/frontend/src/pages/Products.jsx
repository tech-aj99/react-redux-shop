import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userAction";
import { Suspense, useEffect, useState } from "react";
import axios from "../api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const [products, setproducts] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=8&_start=${products.length}`
      );

      if (data.length === 0) {
        sethasMore(false);
      } else {
        setproducts([...products, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Add to Cart handler
  const AddtoCartHandler = (id) => {
    if (!users) return;

    const copyUser = { ...users, cart: [...(users.cart || [])] };
    const index = copyUser.cart.findIndex((c) => c.productId === id);

    if (index === -1) {
      copyUser.cart.push({ productId: id, quantity: 1 });
    } else {
      copyUser.cart[index].quantity += 1;
    }

    dispatch(asyncUpdateUser(copyUser.id, copyUser));
  };

  // ✅ Render products
  const renderProducts = products.map((product) => (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center 
                 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      <div className="w-48 h-48 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h1 className="text-lg font-semibold text-gray-800 mb-2 text-center line-clamp-2">
        {product.title}
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center line-clamp-3">
        {product.description.slice(0, 100)}..
      </p>

      <div className="flex items-center justify-between w-full mb-3">
        <p className="text-xl font-bold text-blue-600">${product.price}</p>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 
                     text-white px-5 py-2 rounded-lg font-medium
                     hover:from-blue-600 hover:to-indigo-700 
                     active:scale-95 transition-all duration-200"
          onClick={() => AddtoCartHandler(product.id)}
        >
          Add to Cart
        </button>
      </div>

      <Link
        to={`/product/${product.id}`}
        className="text-sm font-medium text-blue-500 hover:text-indigo-600 mt-2"
      >
        More Info →
      </Link>
    </div>
  ));

  return products.length > 0 ? (
  <div className="p-6 bg-[#FDFBF5]">
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center items-center py-6 col-span-full">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
      endMessage={
        <p className="text-center mt-6 text-gray-500 font-medium col-span-full">
          🎉 You have seen all products!
        </p>
      }
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <Suspense
        fallback={
          <h1 className="text-center text-3xl text-yellow-500 font-semibold">
            Loading...
          </h1>
        }
      >
        {renderProducts}
      </Suspense>
    </InfiniteScroll>
  </div>
) : (
  <p className="text-center text-gray-500 mt-10 text-lg">Loading...</p>
);
}

export default Products;
