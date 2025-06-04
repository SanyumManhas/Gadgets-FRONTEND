import { useContext, useEffect } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom";

export default function RoutesProtector(props)
{
    const userdata = useContext(UserContext);
    const nav = useNavigate();
    
    useEffect(()=>{
        if(userdata === null)
        {
            nav("/login");
        }
     },[userdata])
    
    return userdata ? <props.CompName /> : null;
}