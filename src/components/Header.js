import { Link } from 'react-router-dom'
import './Header.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

export default function Header()
{
    const {userdata,cartupd} = useContext(UserContext);
    const [clength,setclength] = useState(0);

    const fetchcartlength = async()=>{
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getcartl?uid=${userdata._id}`,{ withCredentials: true })
            if(result.data.success)
            {
                setclength(result.data.length);
            }
            else
            {
                setclength(0);
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    useEffect(()=>{
        if(userdata !== null)
        {
            fetchcartlength();
        }
    },[userdata,cartupd]);


    return(
 
           <nav className="navbar navbar-expand-lg">
                <div className="container-fluid ">
                    <Link to="/" className="navbar-brand me-5 hover-transition"><img className="mb-1 "src="/images/gadgets+logowithmicro.png" width="100" />Gadgets+</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-5 mb-2 mb-lg-0 d-flex justify-content-around ">
                            <li className="nav-item me-2 ">
                            <Link className="text-decoration-none " to="/"><span className="nav-link hover-transition">Home</span></Link>
                            </li>
                            <li className="nav-item me-2 ">
                            <Link className="text-decoration-none " to="/aboutus"><span className="nav-link hover-transition">about us</span></Link>
                            </li>
                            <li className="nav-item me-2 ">
                            <Link className="text-decoration-none " to="/contact"><span className="nav-link hover-transition">contact</span></Link>
                            </li>
                            {/* <li className="nav-item me-2">
                            <Link className="text-decoration-none"to="/news"><span className="nav-link hover-transition">News</span></Link>
                            </li> */}
                        </ul>
                        {userdata?<div className="w-100 d-flex flex-column flex-lg-row justify-content-end">
                        <ul className="navbar-nav ms-5 mb-2 mb-lg-0 justify-content-end">
                            <li className="nav-item ">
                               <Link to={userdata.userType === "normal" || userdata.userType === "professional"? "/user": "/admin"}><img src="/images/usericon.webp" height="45"/></Link>
                            </li>
                            <li className="nav-item ">
                               <Link to="/checkout">
                               {clength > 0 ? <span className='cart-number'>{clength}</span>:null}
                               <ShoppingCartIcon sx={{fontSize:'40px',color:'black'}}/></Link>
                            </li>
                        </ul>
                        </div>: <div className="w-100 d-flex flex-column flex-lg-row  justify-content-end">
                        <ul className="navbar-nav ms-5 mb-2 mb-lg-0 justify-content-end">
                            <li className="nav-item" style={{color:'black'}}>
                                <Link className="text-decoration-none" to="/login"><span className="login-lnk nav-link hover-transition">Login</span></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="text-decoration-none" to="/signup"><span className="login-lnk nav-link hover-transition">Signup</span></Link>
                            </li>
                        </ul>
                        </div>}
                    </div>
                </div>
            </nav>
    )
}