import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfApplication()
{
    const [name,setname] = useState("");
    const [certifications,setcertifications] = useState("");
    const [exp,setexp] = useState("");
    const [sociallinks,setsociallinks] = useState("")

    const handleapplication = async(e)=>{
        e.preventDefault();
      try{
        const msg = {name,certifications,exp,sociallinks};
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/profreg`,msg,{ withCredentials: true });
        if(result.data.success)
        {
          toast.success("Message Sent!")
        }
        else
        {
          toast.info("Problem sending mail please retry")
        }
      }
      catch(e)
      {
        console.log(e.message)
      }
    }

    return(
        <div className="home-body">
            <Header/>
                <div className="container text-white m-0 p-4 ">
                    <h4>Application Form</h4>
                    <hr/>
                </div>
                <form onSubmit={handleapplication}>
                    <div className="form-inputs w-100 d-flex align-items-center p-4">
                        <input className="form-text w-50" type="text" placeholder="Enter Name" onChange={(e)=>setname(e.target.value)}/>
                        <input className="form-text w-50" type="text" placeholder="Enter Certifications" onChange={(e)=>setcertifications(e.target.value)}/>
                        <input className="form-text w-50" type="number" placeholder="Enter Experience (In Years)" onChange={(e)=>setexp(e.target.value)}/>
                        <input className="form-text w-50" type="text" placeholder="Enter Social Profile Links, (Instagram,Youtube)" onChange={(e)=>setsociallinks(e.target.value)}/>
                        <button className="login-btn w-50" type="submit">Continue</button>
                    </div>
                </form>
            <Footer/>
        </div>
    )
}