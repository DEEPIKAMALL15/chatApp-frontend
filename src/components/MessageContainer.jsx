import React from "react";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";
import {  useSelector } from "react-redux";
//import { setSelectedUser } from "../redux/userSlice";
const MessageContainer = () => {
  const {selectedUser,authUser,onlineUsers} = useSelector(store=>store.user);
  //const dispatch = useDispatch();
  /* useEffect(()=>{
      return () => dispatch(setSelectedUser(null));
  },[dispatch]); */
  //const isOnline = onlineUsers.includes(selectedUser._id);
  const isOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false;
  return (
    <>
       {
        selectedUser !== null ? (
          <div className="  /* md:min-w-[550px]  */ w-5/6 flex flex-col  ">
          <div className="flex gap-2 items-center bg-gray-500 px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? 'avatar-online':''}`}>
              <div className="w-10 rounded-full">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="user-profile"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 ">
              <div className="flex justify-between  gap-2 ">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages/>
          <SendInput/>
        </div>
        ) : (
          <div className="/* md:min-w-[550px] */    w-9/12 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-gray-400 font-bold">Hi, {authUser?.fullName}</h1>
          <h1 className="text-2xl text-gray-400">Let's Start Conversation...</h1>
          </div>
        )
       }
    </>
    
  );
};

export default MessageContainer;
