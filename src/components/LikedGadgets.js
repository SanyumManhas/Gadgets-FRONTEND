import { useContext, useEffect, useState, useSyncExternalStore } from "react"
import { UserContext } from "../App"
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LikedGadgets()
{
    const {fetchulikes,userdata,likedgs} = useContext(UserContext);
    const [gadgets,setgadgets] = useState([]);
    const nav = useNavigate()


    useEffect(()=>{
        if(userdata !== null)
        {
            fetchulikes();
        }
    },[userdata]);

     const fetchgadgetsbygid = async(id)=>{
            try{
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/getgadgetsbygid?gid=${id}`,{ withCredentials: true });
                if(result.data.success)
                {
                    if(result.data.gd)
                    {
                        setgadgets(prev => {
                            if (!prev.some(g => g._id === result.data.gd._id)) {
                                return [...prev, result.data.gd];
                            }
                            return prev;
                        });
                    }
                }
                else if(!result.data.success)
                {
                    console.log("couldnt get this gadget + ", id);
                }
            }
            catch(e)
            {
              toast.warn("Network error while getting gadget" + e.message);
            }
        }

    useEffect(()=>{
        if(likedgs.length > 0)
        {
            console.log(likedgs)
            likedgs.forEach((id,i)=>{
                fetchgadgetsbygid(id);
            })
        }
    },[likedgs])

    return(
        <>
            <Header/>
                <div className="home-body">
                    <div className="container d-flex justify-content-center text-white p-3">
                        <h3>Liked Gadgets</h3>
                    </div>
                    <hr style={{color:'white'}}/>
                    <div className="container d-flex justify-content-center">
                    <div className="row gap-2 p-2">
                       {gadgets.map((item,i)=>
                       <div onClick={()=>nav(`/gadget?gid=${item._id}`)} className="col-lg-5" style={{border:'1px solid black',borderRadius:'10px',backgroundColor:'rgba(72, 72, 72, 1)',boxShadow:'1px 1px 1px black',cursor:'pointer'}}>
                            <div className="row">
                            <div className="col-lg-12 p-2">
                                <img className="rounded" src={`${item.gadgetdisplaypic}`} width={`100%`} height={'100%'}/>
                            </div>  
                            <div className="col-lg-8 text-white p-3">
                                <p>{item.gadgetname}</p>
                                <p>{new Date(item.launchdate).toLocaleDateString("en-GB",{
                                    day:"numeric",
                                    month:'long',
                                    year:'numeric'
                                })}</p>
                                <p>Rs.{item.price}</p>
                            </div>
                            </div>
                        </div>)}
                    </div>
                    </div>
                </div>
            <Footer/>        
        </>
    )
}