import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);

console.log( user);

  return (
    <nav className="flex justify-center items-center gap-x-5 p-5 bg-[#FDFBF5]" >
        <NavLink to="/">Home</NavLink>
        {user ? (
          <>
          {user && String(user.isAdmin) === "true" && (
  <NavLink to="/admin/create-product">Create Product</NavLink>
  
)}
             <NavLink to="/admin/user-profile" className="px-3 py-1 bg-black text-white rounded">Settings</NavLink>
          </>
        ) : (
          <>
             <NavLink to="/login" className="px-3 py-1 bg-black text-white rounded">Login</NavLink>
          </>
        )}        

    </nav>
  )
}

export default Nav
