import axios from "axios";
import { useState } from "react";

export default function useDelete(url)
{
    const [datadeleted,setdatadeleted] = useState(false);

    const handledelete = async(id)=>{
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API_URL}/${url}?id=${id}`,{ withCredentials: true });
            if(result.data.success)
            {
                setdatadeleted(true);
            }
            else{
                setdatadeleted(false);
                console.log("couldnt delete user from database")
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }
    
    return{
        handledelete,
        datadeleted
    }
}