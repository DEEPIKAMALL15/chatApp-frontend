
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import HomePage from './components/HomePage.jsx';
import './App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice.js';
import { setOnlineUsers } from './redux/userSlice.js';
import { BACKEND } from './constants.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
])

function App() {
  
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch =  useDispatch();
  
  useEffect(()=>{
    if(authUser && authUser._id){
      
      const socket = io(BACKEND,{
          query:{
            userId:authUser._id,
            
          }
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers',(onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socket.close();
    } else {
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
        
    </div>
  );
}

export default App;
 
/* import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { BACKEND } from './constants.jsx';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  

  useEffect(()=>{
    if(authUser && authUser._id){
      
      const socket = io(BACKEND,{
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers',(onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socket.close();
    } else {
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
 */