import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { BACKEND } from "../constants.jsx";
const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BACKEND}/api/v1/user/`);
        
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
