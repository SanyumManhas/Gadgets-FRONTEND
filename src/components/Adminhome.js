import { useContext, useEffect, useState} from "react";
import Footer from "./Footer";
import Header from "./Header";
import './Adminhome.css'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
export default function Adminhome()
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
            
            cookies.remove("ucookie", { path: '/' });

            sessionStorage.clear();
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
                    <div className="userdetails-highlight"></div>
                    <div className="user-details">
                        {userdata && <> <div className="profile-highlight"></div><img className={`img ${loaded?"visible": ""}`} src="/images/adminpp.jpeg" alt="profile picture"/>
                        <div className="content-highlight"></div>
                        <div className={`content ${loaded?"visible":""}`}>
                            {userdata.username} (admin)<br/>
                            <span>+91 {userdata.phone}</span><br/>
                            <span>{userdata.email}</span><br/>
                            <span>{userdata.address}</span><br/>
                        </div></>}
                    </div>
                </div>
                <div className={`links-container ${loaded?"visible":""}`}>
                        <div className="link" role="button" onClick={()=>nav("/manageusers")}><span>Manage Users</span><span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        {/* <div className="link" role="button" onClick={()=>nav("/manageprofessional")}>Manage Professional Reviews<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div> */}
                        <div className="link" role="button" onClick={()=>nav("/managegadgets")}>Manage Gadgets<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        <div className="link" role="button" onClick={()=>nav("/managesubcats")}>Manage Sub Categories<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        <div className="link" role="button" onClick={()=>nav("/managecats")}>Manage Categories<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                       
                        <div role="button" onClick={handlelogout} className="link">Logout<span><img src="/images/right-sign.png" alt="icon" height="70"/></span></div>
                        
                </div>
               
                <Footer/>
            </div>
        </>
    )
}