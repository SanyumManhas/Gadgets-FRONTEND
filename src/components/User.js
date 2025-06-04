import { useContext, useEffect, useState} from "react";
import Footer from "./Footer";
import Header from "./Header";
import './Adminhome.css'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

export default function User()
{
    const {userdata,setuserdata} = useContext(UserContext);
    const [loaded,setloaded] =useState(false);
    const nav = useNavigate();
    const cookies = new Cookies(null, {path: '/'});

    useEffect(()=>{
        setInterval(()=>{
            setloaded(true)
        },10)
        
    },[])

    const handlelogout = async () => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
        try {
        await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true }); // clear cookie
        setuserdata(null);
        sessionStorage.clear();
        cookies.remove("ucookie", { path: '/' });
        nav("/homepage");
        } catch (e) {
        console.error("Logout error:", e);
        }
    }
    };


    return(
        <>
            <div className="home-body">
                <Header/>
                <div className="user-container">
                    <div className="user-details">
                        {userdata && <> <img className={`img ${loaded?"visible": ""}`} src={`/images/${userdata.profilepic}`} alt="profile picture"/>
                        <div className={`content ${loaded?"visible":""}`}>
                            {userdata.username}<br/>
                            <span>+91 {userdata.phone}</span><br/>
                            <span>{userdata.email}</span><br/>
                            <span>{userdata.address}</span><br/>
                        </div></>}
                    </div>
                </div>
                <div className={`links-container ${loaded?"visible":""}`}>
                        <div className="link" role="button" onClick={()=>nav("/orders")}><span>Order History</span><span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        <div className="link" role="button" onClick={()=>nav("/likedgadgets")}>Liked Gadgets<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        <div role="button" onClick={handlelogout} className="link">Logout<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        
                </div>
               
                <Footer/>
            </div>
        </>
    )
}