import React, { useState } from "react";
import { Link,useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND } from "../constants.jsx";


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate=useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
     
      const res = await axios.post(`${BACKEND}/api/v1/user/register`,user,{
        headers: {
          'Content-Type' : 'application/json'
        },
        withCredentials:true
      });
      
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);

      }
        
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96  mx-auto">
      <div className="w-full p-6 text-gray-200 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-4xl font-bold text-center ">Signup</h1>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="flex flex-col gap-2"
        >
          <div className="">
            <label className="label p-1 ">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full p-2  h-10 rounded-md"
              type="text"
              placeholder="Enter Full Name"
            />
          </div>
          <div>
            <label className="label p-1 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full p-2 h-10 rounded-md "
              type="text"
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label className="label p-1 ">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2  h-10 rounded-md"
              type="password"
              placeholder="Password"
            />
          </div>

          <div>
            <label className="label p-1 ">
              <span className="text-base  label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full p-2  h-10 rounded-md "
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-2">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="w-5 h-5 checkbox  mx-2 "
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="w-5 h-5 checkbox mx-2"
              />
            </div>
          </div>

          <p className="text-center">
            Already have an Account?{" "}
            <Link className="text-center" to="/login">
              Login
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn w-full p-1 rounded-md btn-sm mt-2 border border-slate-700 bg-slate-200 text-gray-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
