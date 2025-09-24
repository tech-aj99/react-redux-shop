import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asynccurrentuser } from "./store/actions/userAction";
import { asyncLoadProducts } from "./store/actions/productAction";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const products = useSelector((state) => state.productReducer.products);
  const hideNav =
     location.pathname.startsWith("/login") ||
     location.pathname.startsWith("/register") ||
     location.pathname === "/404";

  useEffect(() =>{
   !users && dispatch(asynccurrentuser());
  }, [users]);

  useEffect(() =>{
    products.length == 0 && dispatch(asyncLoadProducts());
  },[products]);
  
  return (
    <div className="bg-[#FDFBF5] font-fatura">
      {!hideNav && <Nav />}
      <Mainroutes />
    </div>
  );
};


export default App;
