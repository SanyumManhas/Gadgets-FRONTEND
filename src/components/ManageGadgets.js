import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Musers.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageSubCategories() {

   
  const [categories,setcategories] = useState([])
   
  const [subcategories,setsubcategories] = useState([]);
  const [description,setdescription] = useState("");
  const [loading,setloading] = useState(false);
  
  const [gadgets,setgadgets] = useState([])
    const fetchcats = async()=>{
        try{
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/getcats`,{ withCredentials: true });
          if(result.data.success)
          {
            setcategories(result.data.catsdata);
          }
          else if(!result.data.success)
          {
            console.log("Couldnt fetch categories")
            setcategories([]);
          }
        }
        catch(e)
        {
          console.log(e);
        }
    }
  
    const [gadgetname,setgadgetname] = useState("");

    const [compname,setcompname] = useState("");
    
    const [gadgetdisplaypic,setgadgetdisplaypic] = useState("");
    
    const [newgadgetdisplaypic,setnewgadgetdisplaypic] = useState("");
    
    const [gadgetdisplaypics,setgadgetdisplaypics] = useState([]);
    
    const [newgadgetdisplaypics,setnewgadgetdisplaypics] = useState([]);
    
    const [hotone,sethotone] = useState(false);
    
    const [hotonepic,sethotonepic] = useState("");
    
    const [newhotonepic,setnewhotonepic] = useState("");
    
    const [price,setprice] = useState("")
    
    
    const [launchdate,setlaunchdate] = useState("")

    const[specs,setspecs] = useState([]);
    const [spectitle,setspectitle] = useState("");
    const [specdesc,setspecdesc] = useState("");

    const [descriptions,setdescriptions] = useState([]);

    const [discount,setdiscount] = useState("");
    const [stock,setstock] = useState("");

    const [scid,setscid] = useState("");

    const [cid,setcid] = useState("");
    const [gid,setgid] = useState("");
    const [featured,setfeatured] = useState(false);

    const [editmode,seteditmode] = useState(false);

    const handledelete = async(id)=>{
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API_URL}/delgadget?id=${id}`,{ withCredentials: true });
            if(result.data.success)
            {
                fetchgadgets()
            }
            else{
                
                toast.warn("couldnt delete gadget from database")
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    const handlegadget = async(e)=>{
        e.preventDefault();
        try{
            setloading(true);
            if(editmode)
            {
                const formdata = new FormData();

                formdata.append("gadgetname",gadgetname);
                formdata.append("companyname",compname);
                formdata.append("gid",gid);

                formdata.append("price",price);
                formdata.append("launchdate",launchdate);

                formdata.append("hotone",hotone);

                formdata.append("discount",discount);
                
                formdata.append("stock",stock);

                formdata.append("specs",JSON.stringify(specs));

                formdata.append("featured",featured);

                formdata.append("descriptions",JSON.stringify(descriptions));

                formdata.append("newgadgetdisplaypic",newgadgetdisplaypic);
                
                newgadgetdisplaypics.forEach(file=>{
                    formdata.append("newgadgetdisplaypics",file);
                })
                
                formdata.append("newhotonepic",newhotonepic);

                
                const result = await axios.put(`${process.env.REACT_APP_API_URL}/updategadget`, formdata,{ withCredentials: true });
                if(result.data.success)
                {
                  fetchgadgets();
                  toast.success("Gadget Updated")
                  emptyfields()
                }
                else{
                  alert("Failed to Update category")
                }
            }
            else
            {
                const formdata = new FormData();

                formdata.append("gadgetname",gadgetname);
                formdata.append("companyname",compname);
                formdata.append("cid",cid);
                formdata.append("scid",scid);   

                formdata.append("featured",featured);

                formdata.append("specs",JSON.stringify(specs));

                formdata.append("descriptions",JSON.stringify(descriptions));
                

                formdata.append("gadgetdisplaypic",gadgetdisplaypic);
                
                gadgetdisplaypics.forEach(file=>{
                    formdata.append("gadgetdisplaypics",file);
                })
                
                formdata.append("hotonepic",hotonepic);

                formdata.append("hotone",hotone);
                
      

                formdata.append("price",price);

                formdata.append("discount",discount);

                const newprice = price - (price*(discount/100));
                formdata.append("newprice",newprice);
                
                formdata.append("stock",stock);

                formdata.append("launchdate",launchdate);
  

                const result = await axios.post(`${process.env.REACT_APP_API_URL}/addgadget`,formdata, {withCredentials: true});

                if(result.data.success)
                {
                    toast.success("Gadget Added");
                    fetchgadgets();
                    emptyfields();
                }
                else
                {
                    toast.warn("Couldnt Add Gadget")
                }
            }       
        } 
        catch(e)
        {
          console.log("error while adding gadget details " + e.message)
        }
        finally{
            setloading(false);
        }
      }
  
    const fetchgadgets = async()=>{
    try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getgadgetsbyid?scid=${scid}`,{ withCredentials: true });
        if(result.data.success)
        {
            if(result.data.gadgets)
            {
                setgadgets(result.data.gadgets);
            }
        }
        else if(!result.data.success)
        {
            setgadgets([]);
            toast.warn("Couldnt Get Items!");
        }
    }
    catch(e)
    {
        toast.warn("Network error while getting items " + e.message);
    }
    finally{
        console.log("loading");
    }
}

const fetchsubcats = async()=>{
    try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getsubcats?cid=${cid}`,{ withCredentials: true });
        if(result.data.success)
        {
            if(result.data.subcats)
            {
                setsubcategories(result.data.subcats);
            }
        }
        else if(!result.data.success)
        {
            setsubcategories([]);
            toast.warn("Couldnt Get Items!");
        }
    }
    catch(e)
    {
        toast.warn("Network error while getting items " + e.message);
    }
    finally{
        console.log("loading");
    }
}

    useEffect(()=>{
      if(scid !== "")
      {
        fetchgadgets();
      }
    },[scid])

    useEffect(()=>{
        if(cid !== "")
        {
            fetchsubcats();
        }
    },[cid])

    useEffect(() => {
        fetchcats();
    }, []);


  const onupdate = (id,name,company,hotone,price,launch,discount,stock)=>{
    seteditmode(true)
    setgadgetname(name);
    setcompname(company);
    sethotone(hotone);
    setprice(price);
    setdiscount(discount);
    setstock(stock);
    
    if (launch && !isNaN(new Date(launch))) {
    setlaunchdate(new Date(launch).toISOString().split('T')[0]);
    } else {
    console.warn("Invalid launch date:", launch);
    }
    
    setgid(id);
  }

  const emptyfields = ()=>
    {
        seteditmode(false)
        setgadgetname("");
        setcompname("");
        sethotone("");
        setprice("");
        setdiscount("");
        setstock("");
        setlaunchdate("");
        setgid("");
    }


  const handleremove = (id)=>{
    const updated = [...gadgetdisplaypics];
    updated.splice(id,1);
    setgadgetdisplaypics(updated);
  }

  const handlespec = ()=>{
    setspecs((prev)=>[...prev,{"title":spectitle,"desc":specdesc}]);
  }

  const handledescription = ()=>{
    setdescriptions((prev)=>[...prev,description]);
  }
  
  return (
    <div className="home-body">
      <Header />
      <div className="position-block"></div>
        <div className="users-table d-flex justify-content-center">
            <div className="gadget-selector">
                <select style={{width:'90%', borderRadius:'10px',backgroundColor:'rgb(0, 0, 0)',border:'none',height:'15%',color:'white',padding:'0px'}}
                    value={cid} onChange={(e)=>setcid(e.target.value)}
                >
                    <option value="">Choose Category</option>
                    {categories.map((categories,i)=>
                    <option key={i} value={categories._id}>
                        {categories.catname}
                    </option>)}
                </select>
                <select style={{width:'90%', borderRadius:'10px',backgroundColor:'rgb(0, 0, 0)',border:'none',height:'15%',color:'white',padding:'0px'}}
                    value={scid} onChange={(e)=>setscid(e.target.value)}
                >
                    <option value="">Choose Sub Category</option>
                    {subcategories.map((item,i)=>
                    <option key={i} value={item._id}>
                        {item.subcatname}
                    </option>)}
                </select>
            </div>
          <div className="table-container">
          {gadgets.length>0?<table className="table table-bordered table-hover table-light"> 
            <thead>
              <tr className="table-dark">
                <th scope="col">#</th>
                <th scope="col">Gadget Pic</th>
                <th scope="col">Gadget Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>     
                {
                    gadgets.map((item,i)=>
                        <tr>
                            <td>{i + 1}</td>
                            <td><img src={`${item.gadgetdisplaypic}`} height="100"/></td>
                            <td>{item.gadgetname}</td>
                            <td>
                            <button onClick={() =>{onupdate(item._id,item.gadgetname,item.companyname,item.hotone,item.price
                                ,item.launchdate,item.discount,item.stock
                            )}}>update</button></td>
                            <td>
                            <button onClick={()=>handledelete(item._id)}>delete</button></td>
                        </tr>
                    )
                }        
            </tbody>
          </table>:<h4 style={{color:'white'}}>Select Category and Sub Category to view Gadgets</h4>}
          </div>
        </div>

       {cid !== "" && scid !== ""? 
       <div className="users-details">
         {editmode?
         <h4 style={{color:'white',padding:'10px'}}>Update Gadget</h4>
         : <h4 style={{color:'white',padding:'10px',textAlign:'center'}}>Add Gadget</h4>}
         
         <form onSubmit={handlegadget}>
            <br/>
            <p>Add gadget details in the following form</p>
           <input type="text" value={gadgetname} placeholder="Gadget Name" onChange={(e)=>setgadgetname(e.target.value)}/><br/>
           <input type="text" value={compname} placeholder="Company Name" onChange={(e)=>setcompname(e.target.value)}/><br/>
           <input type="text" value={stock} placeholder="Add stock" onChange={(e)=>setstock(e.target.value)}/><br/>

           {!editmode?<label>
            Display Picture<br/>
            <input type="file" onChange={(e)=>setgadgetdisplaypic(e.target.files[0])}/>
           </label>:
            <label>
            Change Display Picture<br/>
                <input type="file" onChange={(e)=>setnewgadgetdisplaypic(e.target.files[0])}/>
            </label>
           }


           {!editmode?
                gadgetdisplaypic !== ""?
                <><img src={`${URL.createObjectURL(gadgetdisplaypic)}`} height="100"/>
                    <button onClick={()=>setgadgetdisplaypic("")}>remove</button>
                </>:null
                :newgadgetdisplaypic !== ""? <><img src={`${URL.createObjectURL(newgadgetdisplaypic)}`} height="100"/>
                <button onClick={()=>setnewgadgetdisplaypic("")}>remove</button>
                </>:null
            }
           


           {!editmode? <label>
                Add Gadget Pictures<br/>
           <input type="file" onChange={(e)=>{setgadgetdisplaypics([...gadgetdisplaypics,e.target.files[0]]);}}/>
           </label>
           :
           <label>
                Change Gadget Pictures<br/>
                <input type="file" onChange={(e)=>{setnewgadgetdisplaypics([...newgadgetdisplaypics,e.target.files[0]]);}}/>
           </label>}

           {
            !editmode?
            gadgetdisplaypics.length>0?
            <div className="displaypics">
                {gadgetdisplaypics.map((item,i)=>
                    <div style={{margin:'10px'}}><img src={`${URL.createObjectURL(item)}`}height="150"/><br/>
                        <button className="displ-btn" onClick={()=>handleremove(i)}><img src="/images/cancel-icon.png" height="20"/></button>
                    </div>
                )}
            </div>:null:
            newgadgetdisplaypics.length>0?
            <div className="displaypics">
                {newgadgetdisplaypics.map((item,i)=>
                    <div style={{margin:'10px'}}><img src={`${URL.createObjectURL(item)}`} height="150"/><br/>
                        <button className="displ-btn" onClick={()=>handleremove(i)}><img src="/images/cancel-icon.png" height="20"/></button>
                    </div>
                )}
            </div>:null
           }

            <label><input type="checkbox" checked={hotone} onChange={(e)=>sethotone(e.target.checked)}/><br/>Add to Hot Ones?</label><br/>

            {!editmode?
                hotone?
                <>
                    <label>
                        Select Scroller Display Pic<br/>
                    <input type="file" onChange={(e)=>sethotonepic(e.target.files[0])}/>
                    </label>
                </>:null
                : hotone?<>
                    <label>
                        Change Scroller Display Pic<br/>
                    <input type="file" onChange={(e)=>setnewhotonepic(e.target.files[0])}/>
                    </label>
                </>:null
            }

            {
                !editmode?
                hotonepic !== "" && hotone?
                    <div className="displaypics">
                    <img src={`${URL.createObjectURL(hotonepic)}`} height="100"/>
                    <button className="displ-btn" onClick={()=>sethotonepic("")}><img src="/images/cancel-icon.png" height="20"/></button>
                    </div>:
                    null
                : newhotonepic !== "" && hotone?
                <div className="displaypics">
                    <img src={`${URL.createObjectURL(newhotonepic)}`} height="100"/>
                    <button className="displ-btn" onClick={()=>setnewhotonepic("")}><img src="/images/cancel-icon.png" height="20"/></button>
                </div>:null

            }

            <input type="checkbox" name="cbx" checked={featured} onChange={(e)=>setfeatured(e.target.checked)}/>featured?


            <input type="number" placeholder="M.R.P" value={price} onChange={(e)=>setprice(e.target.value)}/>
            <input type="number" value={discount} placeholder="Any Discount" onChange={(e)=>setdiscount(e.target.value)}/><br/>

            <label>
                Enter Launch Date<br/></label>
            <input type="date" value={launchdate} placeholder="Launch Date" onChange={(e)=>setlaunchdate(e.target.value)}/>
            
            <h6>Add specs</h6>
            <input type="text" placeholder="Enter title" onChange={(e)=>setspectitle(e.target.value)}/>
            <input type="text" placeholder="Enter Description" onChange={(e)=>setspecdesc(e.target.value)}/>
            {
                specs.map((item,i)=>
                    <div>
                        {item.title}-{item.desc}
                    </div>
                )
            }
            <button type="button" onClick={handlespec}>Add Spec</button>

            <h6>Add Descriptions</h6>
            <input type="text" placeholder="Add a Description" onChange={(e)=>setdescription(e.target.value)}/>
            <button type="button" onClick={handledescription}>Add Description</button>
            {
                descriptions.map((item,i)=>
                    <p>{item}</p>
                )
            }
           
           {!loading?<>{!editmode?<button type="submit">Add Gadget</button>:<>
           <button type="submit">Update Gadget</button>
           <button type="button" onClick={()=>emptyfields()}>Cancel</button></>}</>:<p>Loading</p>}

         </form>
       </div>:null}
       
      <Footer />
    </div>
  );
}
