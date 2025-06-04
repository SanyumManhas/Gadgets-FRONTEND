import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify";

export default function ForgotPass()
{
    const [em,setem] = useState("");
    const [loading,setloading] = useState(false);

    const handlereset = async(e)=>{
        e.preventDefault();
        try{
            setloading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/resetlink?em=${em}`)
            if(result.data.success)
            {
                toast.info("Mail Sent with reset link")
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
        finally{
            setloading(false)
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
                            <span>Forgot Password</span><br/>
                            Enter Email to get reset link...
                            <form onSubmit={handlereset}>
                            <div className="form-inputs">
                                <input className="form-text" type="text" placeholder="Enter Email" onChange={(e)=>setem(e.target.value)}/>
                                <button className="login-btn" type="submit">{loading? "Sending Mail..." : "Continue"}</button>
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