import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Musers.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useCats from "./useCats";
import { toast } from "react-toastify";

export default function ManageSubCategories() {

  
    const [categories,setcategories] = useState([])
    const [subcategories,setsubcategories] = useState([])
    
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
  
    const [subcatname,setsubcatname] = useState("");
    const [scid,setscid] = useState("");
    const [cid,setcid] = useState("");

    const [editmode,seteditmode] = useState(false);

    const handledelete = async(id)=>{
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API_URL}/delsubcat?id=${id}`,{ withCredentials: true });
            if(result.data.success)
            {
                fetchsubcats()
            }
            else{
                
                toast.warn("couldnt delete subcategory from database")
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    const handlesubcat = async(e)=>{
        e.preventDefault();
        try{
            if(editmode)
            {
                const formdata = {subcatname,cid,scid}
     
                const result = await axios.put(`${process.env.REACT_APP_API_URL}/updatesubCat`, formdata,{ withCredentials: true });
                if(result.data.success)
                {
                  fetchsubcats();
                  toast.success("sub Category Updated")
                  emptyfields()
                }
                else{
                  alert("Failed to Update Sub Category")
                }
            }
            else
            {
                const formdata = {subcatname,cid}
           
                const result = await axios.post(`${process.env.REACT_APP_API_URL}/addsubcat`,formdata,{ withCredentials: true });
                if(result.data.success)
                {
                    toast.success("Sub Category Added");
                    fetchsubcats();
                    emptyfields();
                }
                else
                {
                    toast.warn("Couldnt Add Sub Category")
                }
            }       
        } 
        catch(e)
        {
          console.log("error while adding category details " + e.message)
        }
      }
  
    const emptyfields = ()=>
    {
        seteditmode(false)
        setsubcatname("")
        setcid("");
        setscid("");
    }

    const fetchsubcats = async()=>{
    try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getsubcats?cid=${cid}`,{ withCredentials: true });
        if(result.data.success)
        {
            if(result.data.subcats)
            {
              setsubcategories(result.data.subcats);
              setcid(cid);
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
        if(cid !== "")
        {
            fetchsubcats();
        }
    },[cid])

    useEffect(() => {
        fetchcats();
    }, []);

  const onupdate = (id,subcatname)=>{
    seteditmode(true)
    setsubcatname(subcatname)
    setscid(id);
  }
  
  return (
    <div className="home-body">
      <Header />
      <div className="position-block"></div>
        <div className="users-table d-flex justify-content-center">
            <div className="gadget-selector">
                <select style={{width:'90%', borderRadius:'10px',backgroundColor:'rgb(0, 0, 0)',border:'none',height:'15%',color:'white',padding:'0px'}}
                    onChange={(e)=>setcid(e.target.value)}
                >
                    <option value="">Choose Category</option>
                    {categories.map((categories,i)=>
                    <option key={i} value={categories._id}>
                        {categories.catname}
                    </option>)}
                </select>
            </div>
          <div className="table-container">
            {subcategories.length>0?
          <table className="table"> 
            <thead>
              <tr className="table-dark">
                <th scope="col">#</th>
                <th scope="col">Sub Category Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>     
                {
                    subcategories.map((item,i)=>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{item.subcatname}</td>
                            <td>
                            <button onClick={() =>{onupdate(item._id,item.subcatname)}}>update</button></td>
                            <td>
                            <button onClick={()=>handledelete(item._id)}>delete</button></td>
                        </tr>
                    )
                }        
            </tbody>
          </table>:<h4 style={{color:'white'}}>Select a Category to see sub categories</h4>}
          </div>
        </div>
       {cid? <div className="users-details">
         {editmode?<h6 style={{color:'white',padding:'10px'}}>Update Sub Category</h6>: <h6 style={{color:'white',padding:'10px'}}>Add Sub Category</h6>}
         <form onSubmit={handlesubcat}>
           <input type="text" placeholder="sub category name" value={subcatname} onChange={(e)=>setsubcatname(e.target.value)}/>
            {!editmode?<button type="submit">Add Sub Category</button>:<button type="submit">Update Sub Category</button>}
      
           </form>
       </div>:null}
       
      <Footer />
    </div>
  );
}
