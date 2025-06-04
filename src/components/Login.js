import './Form.css'
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { encryptPassword } from './encryptionUtils-20250415115254';
import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from 'universal-cookie';




export default function Login()
{   
    const {setuserdata} = useContext(UserContext)

    const cookies = new Cookies(null, {path: '/'});

    const [em,setem] = useState("");
    const [pass,setpass] = useState("");
    const navigator = useNavigate();
    const [rem,setrem] = useState(false);

    const handlelogin = async(e)=>{
        e.preventDefault();

        if(cvalue){try{
            const {encryptedData,iv} = await encryptPassword(pass)
            const userdetails = {em,encryptedData,iv};
            const result =await axios.post(`${process.env.REACT_APP_API_URL}/loginUser`,userdetails, { withCredentials: true } );
            
            if(result.data.success)
            {
                setuserdata(result.data.userdata);
                sessionStorage.setItem("udata",JSON.stringify(result.data.userdata));
                if(result.data.userdata.userType === "special")
                {
                    navigator("/admin")
                }
                else
                {
                    if(rem)
                    {
                        cookies.set("ucookie", result.data.userdata._id, {maxAge: 864000});
                    }
                    navigator("/")
                }
            }
            else{
                toast.error("Login Failed")
            }
        }
        catch(e)
        {
            console.log(e)
            toast.warn("Login Failed")
        }}
        else{
            toast.warn("Captcha Verification Failed! Please Try Again.")
        }
       
    }
    const [cvalue,setcvalue] = useState(null);

    function onChange(value) {
        setcvalue(value);
    }
    
    return(
        <>
            <div className="page-container">
                <div className="form-container">
                    <div className="web-title">
                        Gadgets+
                    </div>
                
                    <div className="form-section">
                        <div className="form-data">
                            <span>login</span>
                            Welcome Back!
                            <form onSubmit={handlelogin}>
                            <div className="form-inputs">
                                <input className="form-text" type="text" placeholder="Enter email" onChange={(e)=>setem(e.target.value)}/>
                                <input className="form-text" type="password" placeholder="Enter password" onChange={(e)=>setpass(e.target.value)}/>
                                <div className='d-flex justify-content-between'><label><input type="checkbox" value={rem} onChange={(e)=>setrem(e.target.checked)}/> Remember me?</label> 
                                <Link style={{fontSize:'12px'}}to="/signup">New User?</Link>
                                <Link style={{fontSize:'12px'}} to="/forgotpass">Forgot Password?</Link>
                                </div>
                                <ReCAPTCHA
                                    sitekey="6Le7EUYrAAAAAHOLEiQTfu8Prtjnvja-NJ-d_6gv"
                                    onChange={onChange}
                                />
                                <button className="login-btn" type="submit">Continue</button>
                            </div>
                            </form>
                        </div>
                    </div>
                
                </div>
                <div className="img-container">
                    <img src="./images/geminibanner.jpeg" height="100%" width="100%"/>
                </div>
            </div>
        </>
    )
}