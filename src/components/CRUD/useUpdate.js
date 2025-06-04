import axios from "axios";
import { useEffect, useState } from "react";

export default function useUpdate(url,udetails)
{        
    const [updatesuccess,setupdatesuccess] = useState(false);
    const handleupdate = async(e)=>{
        e.preventDefault();
        try{
            const result = await axios.put(`${process.env.REACT_APP_API_URL}/${url}`, udetails,{ withCredentials: true });
            if(result.data.success)
            {
                setupdatesuccess(true);
            }
            else{
                setupdatesuccess(false);
                alert("Failed to Update Data")
            }
        } 
        catch(e)
        {
            setupdatesuccess(false);
            console.log("error while updating data " + e.message)
        }
    }

    return{
        handleupdate,
        updatesuccess
    }
}