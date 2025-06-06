import React,{useEffect, useRef} from "react";
import { useSelector } from "react-redux";

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);
    
    useEffect(()=>{
       scroll.current?.scrollIntoView({behavior:"smooth"})
    },[message])
    let formattedTime = '';
if (message?.createdAt) {
  const date = new Date(message.createdAt);
  if (!isNaN(date)) {
    formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}


  return (
    <div ref={scroll} className={`chat ${message?.senderId===authUser?._id ? 'chat-end' : 'chat-start '} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={message?.senderId===authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto }
          />
        </div>
      </div>
      <div className="chat-header">
       
      <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
      <div className="chat-bubble bg-gray-700">{message?.message}</div>
      
    </div>
  );
};

export default Message;
