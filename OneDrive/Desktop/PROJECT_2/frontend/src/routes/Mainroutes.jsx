import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { lazy } from "react";
import Home from "../pages/Home";
// import Products from "../pages/Products";
const Products = lazy(() => import("../pages/Products"))
// import Login from "../pages/Login";
const Login = lazy(() => import("../pages/Login"))
 // import Register from "../pages/Register";
const Register = lazy(() => import("../pages/Register"))
//import CreateProduct from "../pages/admin/CreateProduct";
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"))
// import ProductDetails from "../pages/admin/ProductDetails";
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"))
import { useSelector } from "react-redux";
// import UserProfile from "../pages/user/UserProfile";
const UserProfile = lazy(() => import("../pages/user/UserProfile"))
// import PageNotFound from "../pages/PageNotFound";
const PageNotFound = lazy(() => import("../pages/PageNotFound"))
// import AuthWrapper from "./AuthWrapper";
const AuthWrapper = lazy(() => import("./AuthWrapper"))
import UnAuthWrapper from "./UnAuthWrapper";


const Mainroutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<UnAuthWrapper><Login /></UnAuthWrapper>} />
      <Route path="/register" element={<UnAuthWrapper><Register /></UnAuthWrapper>} />
      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />
      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <AuthWrapper>
            <ProductDetails />
          </AuthWrapper>
        }
      />
      <Route path="*" element={<Navigate to="/404" />}/>
      <Route path="/404" element={<PageNotFound />} /> 
    </Routes>
  );
};

export default Mainroutes;
