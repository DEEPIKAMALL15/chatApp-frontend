 import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import toast from "react-hot-toast"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'


const Login = () => {
  const [user, setUser] = useState({
      userName: "",
      password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onSubmitHandler = async (e) => {
      e.preventDefault();
      try{
     
        const res = await axios.post(`http://localhost:8080/api/v1/user/login`,user,{
          headers: {
            'Content-Type' : 'application/json'
          },
          withCredentials:true
        });
        
          navigate("/");
          
          dispatch(setAuthUser(res.data));
  
        
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
      setUser({
        userName: "",
        password: "",
      });
  };
  
  return (
    
    <div className='min-w-96    my-auto' >
      <div className='w-full p-6 text-gray-200 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  border border-gray-100'>
        <h1 className='text-4xl font-bold text-center '>Login</h1>
        <form onSubmit={onSubmitHandler} action='' className='flex flex-col gap-2' >
          
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input 
              value={user.userName} 
              onChange={(e)=>setUser({...user,userName:e.target.value})}
              className='w-full p-2 h-10 rounded-md ' 
              type='text' placeholder='Enter Username'/>
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Password</span>
            </label>
            <input 
               value={user.password} 
               onChange={(e)=>setUser({...user,password:e.target.value})}
              className='w-full p-2  h-10 rounded-md' 
              type='password' placeholder='Password'/>
          </div>
          
          
         
          <p className='text-center my-2'>Don't have an Account? <Link className='text-center' to="/register">
            Signup
          </Link></p>
          
          <div>
            <button type='submit' className='btn w-full p-1 rounded-md btn-sm mt-2 border border-slate-700 bg-slate-200 text-gray-700'>Login</button>
          </div>
        </form>
      </div>
      
    </div>
    
    
    
  )
}

export default Login 
 



