import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactUs()
{
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [subject,setsubject] = useState("")
    const [msg,setmsg] = useState("");

    const handlemsg = async(e)=>{
      e.preventDefault();
      try{
          const apidata={
            subject,
            message:`<b>Name: ${name}</b><br/><b>Email: ${email}</b><br/><b>Message for us: ${msg}</b><br/>`
          }
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/contactus`,apidata,{ withCredentials: true });
          if(result.data.success)
          {
            toast.success("We received your message");
          }
          else
          {
            toast.info("Problem sending message!,please try again");
          }
      }
      catch(e)
      {
        console.log("error sending msg" + e.message)
      }
    }

    return(
        <>
        <Header/>
            <div className="home-body">
                 <main className="main p-2 text-white">
                    <section id="contact" className="contact section">

                    <div className="container" data-aos="fade-up" data-aos-delay="100">

                        <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
                        <iframe style={{border:'0', width: '100%', height: '270px'}} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" 
                        frameBorder="0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>

                        <div className="row gy-4">

                        <div className="col-lg-4">
                            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                            <i className="bi bi-geo-alt flex-shrink-0"></i>
                            <div>
                                <h3>Address</h3>
                                <p>A108 Adam Street, New York, NY 535022</p>
                            </div>
                            </div>

                            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                            <i className="bi bi-telephone flex-shrink-0"></i>
                            <div>
                                <h3>Call Us</h3>
                                <p>+1 5589 55488 55</p>
                            </div>
                            </div>

                            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                            <i className="bi bi-envelope flex-shrink-0"></i>
                            <div>
                                <h3>Email Us</h3>
                                <p>info@example.com</p>
                            </div>
                            </div>

                        </div>

                        <div className="col-lg-8">
                            <form onSubmit={handlemsg}>
                            <div className="row gy-4">

                                <div className="col-md-6">
                                <input type="text" name="name" className="form-control" placeholder="Your Name" required="" onChange={(e)=>setname(e.target.value)}/>
                                </div>

                                <div className="col-md-6 ">
                                <input type="email" className="form-control" name="email" placeholder="Your Email" required="" onChange={(e)=>setemail(e.target.value)}/>
                                </div>

                                <div className="col-md-12">
                                <input type="text" className="form-control" name="subject" placeholder="Subject" required="" onChange={(e)=>setsubject(e.target.value)}/>
                                </div>

                                <div className="col-md-12">
                                <textarea className="form-control m-0" name="message" rows="6" placeholder="Message" required="" onChange={(e)=>setmsg(e.target.value)}></textarea>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <button type="submit" className="bg-black text-white w-50 border border-white rounded">Send Message</button>
                                </div>
                            </div>
                            
                            </form>
                        </div>

                        </div>

                    </div>

                    </section>

                </main>
            </div>
        <Footer/>
        </>
    )
}