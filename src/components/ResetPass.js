import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPass()
{
    const { token } = useParams(); 
    const [em,setem] = useState("")
    const handlereset = async(e)=>{
        e.preventDefault();
        try{
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, {
                token,
                newPassword: em,
            })
            if(result.data.success)
            {
                toast.info("Password Reset Successfully")
            }
            else 
            {
                toast.info("Problem occurred, Retry")
            }
        }
        catch(e)
        {
            console.log(e.message);
            alert("Network Failed, Please Try Again after sometime")
        }
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
                            <span>Reset Password</span><br/>
                            Enter New Password Below 
                            <form onSubmit={handlereset}>
                            <div className="form-inputs">
                                <input className="form-text" type="text" placeholder="New Password" onChange={(e)=>setem(e.target.value)}/>
                                <button className="login-btn" type="submit">Continue</button>
                            </div>
                            </form>
                        </div>
                    </div>
                
                </div>
                <div className="img-container">
                    <img src="/images/geminibanner.jpeg" height="100%" width="100%"/>
                </div>
            </div>
        </>
    )
}