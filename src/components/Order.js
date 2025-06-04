import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

export default function Order()
{
    const [params] = useSearchParams();
    const oid = params.get("oid");
    const [order,setorder] = useState({});
    
    const fetchorder = async()=>{
        try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getorder?oid=${oid}`,{ withCredentials: true });
        if(result.data.success)
        {
            setorder(result.data.order);
         
        }
        else if(!result.data.success)
        {
            setorder({});
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
        if(oid !== null)
        {
            fetchorder();
        }
    },[oid])

    return(
        <div className="home-body">
            <Header/>
        {
            Object.keys(order).length > 0?<>
                <div className="container p-5">
                    <h2 style={{color:'white', padding:'12px'}}>Your Order</h2>
                    <div className="row">
                        <div className="col-lg-6 text-white p-5" style={{backgroundColor:'rgba(12,12,12)'}}>
                            <h6>Gadgets in order</h6>
                            <hr/>
                            <div className="row">
                                {order.gadgets.map((item,i)=>
                                    <div className="col-lg-12 m-2">
                                        <div className="row gap-5">
                                            <div className="col-lg-4 d-flex justify-content-center">
                                                <img src={`${item.img}`} width="190" className="rounded"/>
                                            </div>
                                            <div className="col-lg-6 border bg-black rounded" style={{fontSize:'12px', padding:'12px'}}>
                                                <p>{item.gname}</p>
                                                <p>₹{item.price}</p>
                                                <p>x{item.qty}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-3 p-4" style={{backgroundColor:'rgb(253,251,212)',color:'black',fontSize:'14px',marginRight:'50px'}}>
                            <p>Delivery Details</p>
                            <hr/>
                            <p>Order For: {order.person}</p>
                            <p>Delivery Address: {order.address}</p>
                        </div>
                        <div className="col-lg-2 p-4" style={{backgroundColor:'rgb(253,251,212)',color:'black',fontSize:'12px'}}>
                            <p>Price Details</p>
                            <hr/>
                            <p>Shipping: ₹{order.shipping}</p>
                            <p>Discount on Total: {order.discount}%</p>
                            <p>Total Cost: ₹{order.total}</p>
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-lg-12 text-white">
                            <h6>Order Status</h6>
                            <div className="row p-2">
                                <div className="col-lg-12">
                                    <img src="/images/statustrue.png"  width="50"/><span className="p-2">placed</span>
                                </div>
                                <div className="col-lg-12">
                                    <img src="/images/vline.png"  width="50"/>
                                </div>
                                <div className="col-lg-12">
                                    {order.status === "pending"? <img src="/images/statusfalse.png" width="50"/>:
                                    <img src="/images/statustrue.png"  width="50"/>
                                    }<span>
                                        {order.status === "pending"? <span className="text-secondary p-2">To be delivered</span>: <span>"delivered"</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>:<h2>Order Not Found!</h2>
        }
        <Footer/>
        </div>
    )
}