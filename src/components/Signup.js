import { useState } from 'react';
import {Link} from 'react-router-dom'
import useCreate from './CRUD/useCreate';

export default function Signup()
{
    const [username,setusername] = useState("");
    const [phn,setphn] = useState("");
    const [em,setem] = useState("");
    const [pass,setpass] = useState("");
    const [passc,setpassc] = useState("");
    const [terms,setterms] = useState(false);

    const {handlesignin} = useCreate("createUser",{username,phn,em,pass,passc,terms});


    return(
        <>
            <div className="page-container">
                <div className="form-container">
                    <div className="web-title">
                        Gadgets+
                    </div>
                    <div className="form-section">
                        <div className="form-data">
                            <span>Create your Account</span>
                            Signing up for Gadgets+ is fast and 100% free.
                            <form onSubmit={handlesignin}>
                            <div className="form-inputs">
                         
                                <div className="form-fields">
                                <input className="form-text" type="text" placeholder="username" onChange={(e)=>setusername(e.target.value)}/>
                                <input className="form-text"type="number" placeholder="phone number" onChange={(e)=>setphn(e.target.value)}/>
                                <input className="form-text" type="text" placeholder="email address" onChange={(e)=>setem(e.target.value)}/>
                                <input className="form-text" type="password" placeholder="set password" onChange={(e)=>setpass(e.target.value)}/>
                                <input className="form-text"type="password" placeholder="confirm password" onChange={(e)=>setpassc(e.target.value)}/>
                                </div>
                                
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="customCheck2" onChange={(e)=>setterms(e.target.checked)}/>
                                    <label className="form-check-label" htmlFor="customCheck2">
                                    I have read and agree to the Terms and Conditions                                </label>
                                </div>
                                <button className="login-btn" type="submit">Continue</button>
                        
                                <div className='text-center'>have an account?<Link to="/login">login</Link></div>
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