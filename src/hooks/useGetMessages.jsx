import  { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice.js';
import { BACKEND } from '../constants.jsx';

const useGetMessages = () => {
    const {selectedUser} =useSelector(store=>store.user);
    const dispatch = useDispatch ();
    useEffect(()=>{
        const fetchMessages = async () =>{
            try{
                
                const res = await axios.get(`${BACKEND}/api/v1/message/${selectedUser?._id}`, {
  withCredentials: true
});
                
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchMessages();
    },[selectedUser,dispatch])
}

export default useGetMessages
