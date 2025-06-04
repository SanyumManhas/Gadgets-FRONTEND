import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OrderHistory()
{
    const {userdata} = useContext(UserContext);
    const [orders,setorders] = useState([]);
    const nav = useNavigate();
    
    const fetchorders = async()=>{
         try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getordersbyuid?uid=${userdata._id}`,{ withCredentials: true });
        if(result.data.success)
        {
            setorders(result.data.orders);
         
        }
        else if(!result.data.success)
        {
            setorders([]);
        }
    }
    catch(e)
    {
      toast.warn("Network error while getting items " + e.message);
    }
    finally{
      console.log("fetched gadgets");
    }
    }

    useEffect(()=>{
        if(userdata !== null)
        {
            fetchorders();
        }
        },[userdata])

    useEffect(()=>{
        console.log(orders)
    },[orders])
    return(
        <div className="home-body">
            <Header/>
                <div className="container">
                    <h4 style={{color:"white",padding:"20px"}}>Order History</h4>
                    <table className="table table-dark table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr.no</th>
                                <th>Delivered To</th>
                                <th>Items</th>
                                <th>OrderDate</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {orders.map((item,i)=>
                                <tr onClick={()=>nav(`/order?oid=${item._id}`)}>
                                        <td>{i+1}</td>
                                        <td>{item.person}, {item.address}</td>
                                        <td>{item.gadgets.map((g,i)=><>{g.gname},</>)}</td>
                                        <td>{new Date(item.orderdate).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        })}</td>
                                        <td>{item.status}</td>
                                </tr>   
                        )}
                        </tbody>
                    </table>
                </div>
            <Footer/>
        </div>
    )
}