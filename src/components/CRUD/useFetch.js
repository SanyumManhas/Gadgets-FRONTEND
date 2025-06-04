import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetch(url,dependency)
{
    const [data,setdata] = useState([]);
    const [loading,setloading] = useState(false);

    useEffect(()=>{
        const fetch = async()=>{
            try{
                setloading(true)
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/${url}`,{ withCredentials: true });
                if(result.data.success)
                {
                    if(result.data.dbdata)
                    {
                        setdata(result.data.dbdata);
                    }
                }
                else
                {
                    toast.warn("Couldnt Get Items!");
                }
            }
            catch(e)
            {
                toast.warn("Network error while getting items " + e.message);
            }
            finally{
                setloading(false);
                console.log(loading);
            }
        }
        fetch();
    },[...dependency])

    return{data,loading}
}