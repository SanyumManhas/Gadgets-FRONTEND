import {useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Musers.css";
import useFetch from "./CRUD/useFetch";
import useUpdate from "./CRUD/useUpdate";
import useDelete from "./CRUD/useDelete";
import { toast } from "react-toastify";

export default function ManageUsers() {

  const [username,setusername] = useState("");
  const [phone,setphone] = useState("");
  const [email,setemail] = useState("");
  const [address,setaddress] = useState("");
  const [loaded, setloaded] = useState(false);
  const [editmode,seteditmode] = useState(false);
  const [finduser,setfinduser] = useState("");
  const [getall,setgetall] = useState(true);
  const [professional,setprofessional] = useState(false);

  const {handledelete,datadeleted} = useDelete("deluser");
  const {handleupdate,updatesuccess} = useUpdate("updateUser",{username,phone,email,address,professional});
  const {data,loading} = useFetch("getusers",[updatesuccess,datadeleted]);


  useEffect(() => {
    const id = setTimeout(() => {
      setloaded(true);
    }, 10);

    return ()=>clearTimeout(id);
  }, []);

  useEffect(()=>{
    if(updatesuccess)
    {
      toast.success("User Updated!")
    }
  },[updatesuccess])

  
  const onupdate = (name,phone,email,address,utype)=>{

    let value = utype === "professional"?true:false
    console.log(value);
    seteditmode(true)
    setusername(name)
    setphone(phone)
    setemail(email)
    setaddress(address);
    setprofessional(value)
  }
  
  return (
    <div className="home-body">
      <Header />
      <div className="items-box">
          <div className="usersearch-bar">
              <p className="heading">Registered Users</p>
              <input type="text" defaultValue="search user" onChange={(e)=>setfinduser(e.target.value)}/>
              {getall?<button style={{background:'none',height:'61px',borderRadius:'20px',marginLeft:'10px'}}onClick={()=>setgetall(false)}><img src="/images/search-icon.png" height="40"/></button>
              :<button style={{background:'none',border:'none'}}onClick={()=>setgetall(true)}><img src="/images/cancel-icon.png" height="30"/></button>}
          </div>
        <div className="users-table">
          {!loading && data.length > 0?<table className="table table-bordered table-hover table-light"> 
            <thead>
              <tr className=" table-dark">
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
            {data.filter((user,i)=>getall||user.username === finduser).map((user, i) => (
              <tr key={user._id}>
                <th scope="row">{i + 1}</th>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => onupdate(user.username, user.phone, user.email, user.address,user.userType)}>
                    update
                  </button>
                </td>
                <td>
                  <button onClick={() => handledelete(user._id)}>delete</button>
                </td>
              </tr>))}
            </tbody>
          </table>:<h4 className="p-2">Looking for Users</h4>}
        </div>
        </div>
        {editmode?
         <div className="users-details">
         <h6 style={{color:'white',padding:'10px'}}>User Details</h6>
         <form onSubmit={handleupdate}>
           <input type="text" placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
           <input type="text" placeholder="phone number"value={phone} onChange={(e)=>setphone(e.target.value)}/>
           <input type="text" placeholder="email"value={email} onChange={(e)=>setemail(e.target.value)}/>
           <input type="text" placeholder="address"value={address} onChange={(e)=>setaddress(e.target.value)}/>
           <label><input type="checkbox" checked={professional} onChange={(e)=>setprofessional(e.target.checked)}/>Make Professional?</label>  
           <button type="submit">Update User</button>
         </form>
       </div>:<h6 style={{color:'white',padding:'10px'}}>Select user to Update/Edit</h6>
        }
       
      <Footer />
    </div>
  );
}
