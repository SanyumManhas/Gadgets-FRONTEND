import SiteNavs from './components/SiteNavs';
import './App.css';
import { toast, ToastContainer} from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const UserContext = createContext();

function App() {
  const [userdata,setuserdata] = useState(null);
  const [cartupd,setcartupd] = useState(false);
  const [likedgs,setlikedgs] = useState([]);
  const cookies = new Cookies(null, {path: '/'});

  useEffect(()=>{
    if(sessionStorage.getItem("udata") !== null)
    {
      console.log("taken user data from session")
      setuserdata(JSON.parse(sessionStorage.getItem("udata")));
    }
  },[]);

  useEffect(()=>{
    if(cookies.get("ucookie") !== null)
    {
      fetchuserbyid(cookies.get("ucookie"));
    }
  },[])

  const fetchuserbyid = async(id)=>{
    try{
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/getubyid?id=${id}`, {withCredentials: true});
      if(result.data.success)
      {
        setuserdata(result.data.udata);
      }
      else
      {
        console.log("Cookie login failed! + no cookie found");
      }
    }
    catch(e)
    {
      console.log("Unexpected error during cookie login! + network error while using cookie to login")
    }
  }


  const handlelikedGs = async(objid)=>{
    try{
      const apidata = {uid:userdata._id,objid};
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/handlelikes`,apidata, {withCredentials: true});
      if(result.data.success)
      {
        fetchulikes();
      }
      else
      {
        toast.warn("Problem registering like")
      }
    }
    catch(e)
    {
      console.log(e.message);
    }
  }


  const fetchulikes = async()=>{
     try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getulike?uid=${userdata._id}`, {withCredentials: true});
        if(result.data.success)
        {
          setlikedgs(result.data.likes)
        }
        else
        {
          setlikedgs([]);
        }
      }
      catch(e)
      {
          toast.warn("Network error while getting items " + e.message);
      }
  }

  
  useEffect(()=>{
    if(userdata !== null)
   { fetchulikes()}
  },[userdata])



  return (
    <UserContext.Provider value={{userdata,setuserdata,cartupd,setcartupd,handlelikedGs,likedgs,fetchulikes}}>
      <div className="app">   
          <SiteNavs/>
          <ToastContainer theme="colored"/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext}