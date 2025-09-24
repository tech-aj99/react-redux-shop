import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice"; 


export const asyncUpdateUser = (id,user) => async (dispatch, getState) =>{
  try {
    const {data} = await axios.patch("/users/" + id, user);
    localStorage.setItem("user",JSON.stringify(data));
    dispatch(asynccurrentuser());
  }
  catch(error){
  //  console.log(error);
  }
}

export const asyncDeleteUser = (id) => async (dispatch, getState) =>{
  try {
    await axios.delete("/users/" + id);
    dispatch(asyncLogoutUser());
  }
  catch(error){
    console.log(error);
  }
}

export const asynccurrentuser = () => async (dispatch, getState) =>{
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) dispatch(loaduser(user));
    else console.log("User not logged in!");
  }
  catch(error){
    console.log(error);
  }
}

export const asyncloginuser = (user) => async (dispatch, getState) =>{
  try {
    const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`);
    localStorage.setItem("user",JSON.stringify(data[0]));
    dispatch(asynccurrentuser());
  }
  catch(error){
    console.log(error);
  }
}

export const asyncLogoutUser = () => async (dispatch, getState) =>{
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
    console.log("User Logged out!");
  }
  catch(error){
    console.log(error);
  }
}

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    console.log("User Registered:", res.data);

    // Example: If you have a reducer action like loadUser
    // dispatch(loadUser(res.data));
  } catch (error) {
 //   console.error("Register Error:", error.message);
  }
};
