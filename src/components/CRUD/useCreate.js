import axios from "axios";
import { toast } from "react-toastify";

export default function useCreate(url,userData)
{
    const handlesignin = async(e)=>{
        e.preventDefault();
        try{
            if(userData.pass === userData.passc && userData.terms)
                {
                    const result = await axios.post(`${process.env.REACT_APP_API_URL}/${url}`, userData,{ withCredentials: true });
                    if(result.data.success)
                    {
                        toast.success("Registered Successfully!");
                    }
                    else
                    {
                        console.log("DB error, success returned false...")
                        toast.warn("Registeration Failed!");
                    }
                }
                else
                {
                    if(userData.terms)
                    {
                        toast.error("Passwords Dont Match!");
                    }
                    else
                    {
                        toast.error("Accept terms!");
                    }
                }
        }
        catch(e)
        {
            console.log(e.message);
            toast.error("Registeration Failed!")
        }
    }

    return{
        handlesignin
    }
}