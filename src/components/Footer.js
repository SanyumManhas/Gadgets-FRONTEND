import { useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';
import { Button } from '@mui/material';

export default function Footer()
{
  const {userdata} = useContext(UserContext)
  const nav = useNavigate();

    
    return(

          <footer className="bg-dark text-center text-lg-start text-white" style={{fontFamily:"Arial", fontSize:"15px", backgroundImage:" linear-gradient(190deg, rgb(10, 10, 10),rgba(49, 49, 49, 1),rgba(49, 49, 49, 1),rgba(151, 151, 151, 1))"}}>
            <div className="container p-1">
              <div className="row my-4">
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        
                  <div className="bg-none shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style={{width: "150px", height: "150px"}}>
                    <img src="./images/gadgets+logowithmicro.png" height="150%" alt=""/>
                  </div>
        
                  <p className="text-center fs-2">Gadgets+</p>
        
                  <ul className="list-unstyled d-flex flex-row justify-content-center">
                    <li>
                      <a className="text-white px-2" href="#!">
                        <i className="fab fa-facebook-square fs-5"></i>
                      </a>
                    </li>
                    <li>
                      <a className="text-white px-2" href="#!">
                        <i className="fab fa-instagram fs-5"></i>
                      </a>
                    </li>
                    <li>
                      <a className="text-white ps-2" href="#!">
                        <i className="fab fa-youtube fs-5"></i>
                      </a>
                    </li>
                  </ul>
        
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0 mt-5">
                  <h6 className="text-uppercase mb-4">About us</h6>
                  <p className="fs-7" style={{textAlign:'justify'}}>
                  Built using the latest in full-stack web Stack, we are committed to a seamless, responsive, and secure experience for every user — from browsing and reviewing to purchasing and beyond.  
                  </p>  </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0 mt-5">
                  <h6 className="text-uppercase mb-4">Useful links</h6>
        
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li className="mb-2">
                      {userdata?<Link to="/user" className="text-white">Your Account</Link>: null}
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0 mt-5">
                  <h6 className="text-uppercase mb-4">Contact</h6>
        
                  <ul className="list-unstyled">
                    <li>
                      <p><i className="fas fa-map-marker-alt pe-2"></i>House no.1 Raja garden Extension</p>
                    </li>
                    <li>
                      <p><i className="fas fa-phone pe-2"></i>+91 8528550003</p>
                    </li>
                    <li>
                      <p><i className="fas fa-envelope pe-2 mb-0"></i>contact@gadgets+.com</p>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-5">
                  <h6 className="text-uppercase mb-2">Want to Be a Registered Professional?</h6>
                  <Button className="btn btn-primary mt-2 w-75 bg-black border-0 text-white" onClick={()=>nav("/professionalapplication")}>Apply Now</Button>
                  {/* <form onSubmit={handleprofregister}>
                  <div class="form-group">
                      <p className="text-secondary">Send us a request mentioning your profile,experience and domain, We'll get back to you as soon as possible</p>
                      <textarea className="form-control m-0" placeholder="Your Message" onChange={(e)=>setmsg(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2 w-100 bg-black border-0">Submit</button>
                  </form> */}
                </div>
              </div>
            </div>
          
            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
              © 2025 Copyright:
              <Link className="text-white" href="https://mdbootstrap.com/">Gadgets+.com</Link>
            </div>
          </footer>
        
  
    )
}