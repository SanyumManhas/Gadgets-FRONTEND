import {useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Musers.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageCategories() {

  const [categories,setcategories] = useState([])
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

  
  const [catname,setcatname] = useState("");
  const [cid,setcid] = useState("");

  const [editmode,seteditmode] = useState(false);

  const handlecat = async(e)=>{
    e.preventDefault();
    try{
        if(editmode)
        {
            const formdata = {catname,cid}
          
            const result = await axios.put(`${process.env.REACT_APP_API_URL}/updateCat`, formdata,{ withCredentials: true });
            if(result.data.success)
            {
              fetchcats();
              toast.success("Category Updated")
              emptyfields()
            }
            else{
              alert("Failed to Update category")
            }
        }
        else
        {
            const formdata = {catname}
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/addcat`,formdata, {withCredentials: true});
            if(result.data.success)
            {
                fetchcats();
                emptyfields();
            }
            else
            {
                alert("Couldnt Add Category")
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
    setcatname("")
    setcid("");
  }

  useEffect(() => {
    fetchcats();

  }, []);

  const handledelete = async(id)=>{
    try{
        const result = await axios.delete(`${process.env.REACT_APP_API_URL}/delcat?id=${id}`,{ withCredentials: true });
        if(result.data.success)
        {
          fetchcats();
        }
        else{
          toast.warn("couldnt delete Category from database")
        }
    }
    catch(e)
    {
      console.log(e.message)
    }
  }

  const onupdate = (id,catpic,catname)=>{
    seteditmode(true)
    setcatname(catname)
    setcid(id);
  }
  
  return (
    <div className="home-body">
      <Header />
      <div className="position-block"></div>
        <div className="users-table d-flex justify-content-center">
        <div className="table-container">
          <table className="table table-bordered table-hover table-light"> 
            <thead>
              <tr className=" table-dark">
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((categories,i)=>
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{categories.catname}</td>
                    <td><button onClick={()=>onupdate(categories._id,categories.catpic,categories.catname)}>update</button></td>
                    <td><button onClick={()=>handledelete(categories._id)}>delete</button></td>
                </tr>
              )}
              
            </tbody>
          </table>
          </div>
        </div>
        <div className="users-details">
         {editmode?<h6 style={{color:'white',padding:'10px'}}>Update Category</h6>: <h6 style={{color:'white',padding:'10px'}}>Add Category</h6>}
         <form onSubmit={handlecat}>
           <input type="text" placeholder="category name" value={catname} onChange={(e)=>setcatname(e.target.value)}/>
           {!editmode?<button type="submit">Add Category</button>:<button type="submit">Update Category</button>}
         </form>
       </div>
       
      <Footer />
    </div>
  );
}
