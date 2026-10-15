import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response.status === 401) {
        navigate('/login');
      }
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [])
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Body