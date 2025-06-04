import { useParams, useSearchParams } from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import './Checkout.css';
import DiscountIcon from '@mui/icons-material/Discount';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import axios from "axios";
import { toast } from "react-toastify";
export default function Checkout()
{
    const [params] = useSearchParams();
    const gid = params.get("gid");
    const qty = params.get("qty");

    const [finallist,setfinallist] = useState([]);
    const [subtotalprice,setsubtotalprice] = useState("");

 

    const {userdata,cartupd,setcartupd} = useContext(UserContext);

    const [uname,setuname] = useState("");
    const [add,setadd] = useState("");

    const fetchgadget = async()=>{
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getgadgetsbygid?gid=${gid}`,{ withCredentials: true });
            if(result.data.success)
            {
                if(result.data.gd)
                {
                  setfinallist([result.data.gd]);
                }
            }
            else if(!result.data.success)
            {
                setfinallist([]);
            }
        }
        catch(e)
        {
          toast.warn("Network error while getting single gadget " + e.message);
        }
        finally{
          console.log("fetched gadget");
        }
    }

    useEffect(()=>{
        if(gid !== null)
        {
            fetchgadget();
        }
    },[gid]);

    useEffect(()=>{
        if(finallist.length > 0 )
        {
            if(qty)
            {
                setsubtotalprice((finallist[0].price - (finallist[0].price * (finallist[0].discount/100)))*qty)
            }
            else
            {
                setsubtotalprice(finallist.reduce((acc,item)=>{
                    return acc + (item.dprice*item.qty)
                },0))
            }  
        }
    },[finallist]);

    const fetchcart = async()=>{
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getcart?uid=${userdata._id}`,{ withCredentials: true })
            if(result.data.success)
            {
                setfinallist(result.data.cartitems);
            }
            else
            {
                setfinallist([]);
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    useEffect(()=>{
        if(userdata)
        {
            setuname(userdata.username);
            setadd(userdata.address);
            if(gid === null)
            {
                fetchcart()
            }
        }
    },[userdata,gid])

    const handleOrder = async()=>{
        if(add !== "Address Not Added" && add !== "")
        {try{
            
            let orderlist;
            if(gid){
                orderlist = finallist.map((item,i)=>{return {qty,img:item.gadgetdisplaypic,gname:item.gadgetname,price:(item.price - (item.price * (item.discount/100)))}})
            }
            else
            {
                orderlist = finallist.map((item,i)=>{return{qty:item.qty,img:item.img,gname:item.gname,price:item.dprice,}})
            }
            const orderdata = {
                orderlist,
                total:(subtotalprice + 500) - ((subtotalprice+500)*0.05),
                shipping:500,
                discount:5,
                pname:uname,
                address:add,
                uid:userdata._id
            }
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/createOrder`,orderdata,{ withCredentials: true });
            if(result.data.success)
            {
                toast.success("Order Placed!");
                emptyCartofUser()
            }
            else
            {
                toast.info("Failed to Place Order, Please Try Again!")
            }
        }
        catch(e)
        {
            toast.error("Fatal Error!")
            console.log(e.message)
        }}
        else
        {
            toast.info("Please Enter Address!")
        }
    }

    const emptyCartofUser = async(id)=>{
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API_URL}/delcartofuser?uid=${userdata._id}`,{ withCredentials: true });
            if(result.data.success)
            {
                setcartupd(!cartupd)
                fetchcart();
            }
            else
            {
                toast.info("Couldnt remove, Please Try Again")
            }
        }
        catch(e)
        {
            toast.error(e.message)
            console.log(e.message);
        }
    }

    const emptyCart = async(id)=>{
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API_URL}/delfromcart?citem=${id}`,{ withCredentials: true });
            if(result.data.success)
            {
                setcartupd(!cartupd)
                fetchcart();
            }
            else
            {
                toast.info("Couldnt remove, Please Try Again")
            }
        }
        catch(e)
        {
            toast.error(e.message)
            console.log(e.message);
        }
    }
    return(
        <div className="home-body">
            <Header/>
                <div className="row">
                    <div className="col-lg-7 deliver-details">
                        {userdata && <div className="delivery-form">
                            <h3>Checkout</h3>
                            <div className="container p-3">
                                <p>Delivery Details <LocalShippingIcon/></p>
                                <label>
                                    Address<br/><br/>
                                    <div className="container border p-2" style={{backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:'10px'}}>
                                        <textarea value={add}  onChange={(e)=>setadd(e.target.value)}></textarea>
                                    </div>
                                </label><br/><br/>


                                <p>Contact Details</p>
                                <label>
                                    Name<br/>
                                    <div className="container border p-2" style={{backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:'10px'}}>
                                        <input value={uname} onChange={(e)=>setuname(e.target.value)}/>
                                    </div>
                                </label>
                                <br/>
                                <br/>
                                <label>
                                    Phone Number<br/>
                                    <div className="container border p-2" style={{backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:'10px'}}>
                                        <input defaultValue={`${userdata.phone}`}/>
                                    </div>
                                </label>
                                <br/>
                                <br/>
                                <label>
                                    Email Address<br/>
                                    <div className="container border p-2" style={{backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:'10px'}}>
                                        <input defaultValue={`${userdata.email}`}/>
                                    </div>
                                </label>
                                <br/>
                                <br/>
                                <label>
                                    Select Payment Mode<br/>
                                    <div className="container border p-2" style={{backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:'10px'}}>
                                        <select style={{backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:'10px',fontSize:'14px',height:'50px'}}>
                                            <option>Select Payment Mode</option>
                                            <option>Cash</option>
                                            <option>Card</option>
                                        </select>
                                    </div>
                                </label>
                                <br/>
                            </div>
                        </div>}
                    </div>
                    <div className="col-lg-5 place-details">
                           { finallist.length>0? <div className="place-form">
                                
                                    <p>Review Your Cart</p>
                                    {gid? finallist.map((item,i)=><div className="product-preview">
                                        <img src={`/images/${item.gadgetdisplaypic}`}/>
                                        <div className="container ">
                                            <span>{item.gadgetname}</span><br/>
                                            <span>x{qty}</span><br/>
                                           <span className="text-danger">-{item.discount}%</span> {item.price - (item.price*(item.discount/100))}
                                        </div>
                                    </div>):
                                     finallist.map((item,i)=><div className="product-preview">
                                        <button style={{height:'25px',textAlign:'center',background:'none',border:'none',color:'white'}} onClick={()=>emptyCart(item._id)}>x</button>
                                        <img src={`${item.img}`}/>
                                        
                                        <div className="container ">
                                            <span>{item.gname}</span><br/>
                                            <span>x{item.qty}</span><br/>
                                           <span className="text-danger">-{item.discount}%</span> {item.dprice}
                                        </div>
                                    </div>)
                                    }

                                    <br/>
                                    <br/>   
                                    
                                    {/* <div className="discount-cp">
                                       <p> <DiscountIcon/> Discount Code</p>
                                       <p>Apply</p> 
                                    </div> */}

                                    <div className="price-details">
                                        <p>SubTotal</p>
                                        <p>{subtotalprice}/-</p>
                                    </div>
                                    <div className="price-details">
                                        <p>Shipping</p>
                                        <p>500/-</p>
                                    </div>
                                    <div className="price-details">
                                        <p>Discount</p>
                                        <p>5%</p>
                                    </div>
                                    <div className="price-details">
                                        <p>Total</p>
                                        <p>{(subtotalprice + 500) - ((subtotalprice+500)*0.05)}</p>
                                    </div>
                                    <button style={{backgroundColor:'black',
                                        color: 'white',
                                        border: '2px solid black',
                                        height:'44px',
                                        borderRadius: '6px',width:'100%'}} 
                                    onClick={handleOrder}>Place Order</button>
                                
                            </div>: <h4 style={{color:'white'}}>Cart is Empty</h4>}
                            
                    </div>  
                </div>
            <Footer/>
        </div>
    )
}