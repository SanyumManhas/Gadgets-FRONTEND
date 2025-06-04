import axios from "axios";
import { useContext} from "react";
import { UserContext } from "../App";

export default function useCats()
{
    const {categories,setcategories} = useContext(UserContext);

     const fetchcats = async()=>{
       try{
         const result = await axios.get(`${process.env.REACT_APP_API_URL}/getcats`,{ withCredentials: true });
         if(result.data.success)
         {
           setcategories(result.data.catsdata);
         }
         else if(!result.data.success)
         {
           console.log("Couldnt fetch categories")
           setcategories([]);
         }
       }
       catch(e)
       {
         console.log(e);
       }
   }

   return{
    fetchcats
   }
}