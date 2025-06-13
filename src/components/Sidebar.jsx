

import React, { useState } from "react";

import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

import { FiInstagram } from "react-icons/fi";
import { setAuthUser } from "../redux/userSlice";
import { BACKEND } from "../constants.jsx";


const Sidebar = () => {
  useGetOtherUsers();
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      
      const res = await axios.get(`${BACKEND}/api/v1/user/logout`, {
  withCredentials: true
});
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  
  const filteredUsers = otherUsers?.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border-r border-slate-500 w-3/12 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <FiInstagram className="text-4xl" />
        <h1 className="text-3xl text-slate-300 font-semibold">LinkUp</h1>
      </div>

      <form className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
      </form>

      <div className="divider px-3"></div>

      <OtherUsers users={search ? filteredUsers : otherUsers} />

      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
