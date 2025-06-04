import Footer from "./Footer";
import Header from "./Header";
import Carousel from "./Carousel";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function Home() {
  const {handlelikedGs,likedgs} = useContext(UserContext);
  const [catfilterid,setcatfilterid] = useState(null);
  const [catselected,setcatselected] = useState(null);
  const [companyfilter,setcompanyfilter] = useState(null);
  const [pricefilter,setpricefilter] = useState(null);
  const [localfilter,setlocalfilter] = useState(null);
  const [gname,setgname] = useState(null);
  const [cname,setcname] = useState(null);
  const [loading,setloading] = useState(true);
  const [maxprice,setmaxprice] = useState(0);

  const [pricerange, setpricerange] = useState([0, 20000]);

  const [catbox, setcatbox] = useState(false);

  const [gadgets, setgadgets] = useState([]);
  const [dispgadgets, setdispgadgets] = useState([]);
  const [scrollerdata, setscrollerdata] = useState([]);
  const [uniqueCompanies, setuniqueCompanies] = useState([]);
  const [catswithsubcats, setcatswithsubcats] = useState([]);
  const [filteredcompanies,setfilteredcompanies]= useState([]);


  const fetchgadgets = async()=>{
    try{
        setloading(true);
        console.log("loading set to true")
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/getgadgets`, { withCredentials: true } );
        if(result.data.success)
        {
            if(result.data.gdlist)
            {
              setgadgets(result.data.gdlist);
            }
        }
        else if(!result.data.success)
        {
            setgadgets([]);
        }
    }
    catch(e)
    {
      toast.warn("Network error while getting items " + e.message);
    }
    finally{
      console.log("fetched gadgets");
      setloading(false);
      console.log("loading set to false")
    }
}
  
  const fetchcatswithsubcats = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/getcatswithsubcats`,{ withCredentials: true }
      );
      if (result.data.success) {
        setcatswithsubcats(result.data.catswithsubcats);
      } else if (!result.data.success) {
        console.log("Couldnt fetch categories");
        setcatswithsubcats([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchfilter = async()=>{
    try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/gfilter?id=${catfilterid}&comp=${companyfilter}&price=${JSON.stringify(pricefilter)}&localfilter=${localfilter}`
      ,{ withCredentials: true });
        if(result.data.success)
        {
          if(result.data.gadgets)
          {
            setdispgadgets(result.data.gadgets);
          }
        }
        else if(!result.data.success)
        {
            setdispgadgets([]);
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

  const handlegadgetSearch = async(e)=>{
    e.preventDefault();
      try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/searchbyname/${gname}`,{ withCredentials: true });
        if(result.data.success)
        {
          setdispgadgets(result.data.fetchedgadgets);
        }
        else
        {
          setdispgadgets([]);
        }
      }
      catch(e)
      {
        toast.error("Error in searching");
        console.log("Error :" + e.message);
      }
  }

  const handlecompanysearch = ()=>{
  if(cname !== null)
  {
    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filtered = uniqueCompanies.filter(item => 
      new RegExp('.*' + escapeRegex(cname) + '.*', 'i').test(item)
    );
    setfilteredcompanies(filtered);
  }
}


  const handleRender = (node, props) => {
    return (
      <Tooltip
        overlay={`₹${props.value}`}
        visible={props.dragging}
        placement="top"
      >
        {node}
      </Tooltip>
    );
  };


  useEffect(()=>{
    fetchgadgets();
    fetchcatswithsubcats();
  },[]);

  useEffect(()=>{
    if(gadgets.length > 0)
    {
      setscrollerdata(gadgets.filter((gadget,i)=>gadget.hotone));
      setuniqueCompanies([...new Set(gadgets.map((item,i)=>item.companyname))]);
      setdispgadgets(gadgets);
      const max = gadgets.reduce((acc,item)=>{
        return acc = acc + item.price
      },0)
      setmaxprice(max)
    }
  },[gadgets])

  useEffect(()=>{
    if(catfilterid !== null || companyfilter !== null || pricefilter !== null || localfilter !== null)
    {
      fetchfilter()
    }
    else
    {
      setdispgadgets(gadgets);
    }
  },[catfilterid,companyfilter,pricefilter,localfilter]);

  return (
    <>
    {!loading? 
    <div className="home-body">
      <Header/>
      {gadgets.length>0 && <><Carousel>
        {scrollerdata.map((item, i) => (
          <Link to={`/gadget?gid=${item._id}`} key={i} className="component">
            <img src={`${item.hotonepic}`} />
            <div className="caption">
              <p className="name" style={{fontSize:'14px'}}>{item.gadgetname}</p>
            </div>
          </Link>
        ))}
      </Carousel>
      <div className="homecontent-container">
        <div className="filters-container">
          <h4
            style={{
              color: "white",
              padding: "10px",
              textShadow: "4px 4px 4px black",
            }}
          >
            <b>Filters</b>
          </h4>
          <button
            className="category-selector"
            onClick={() => setcatbox(!catbox)}
          >
            Select Category&nbsp;
            <img
              className={`${catbox === true ? "iconrotate" : ""}`}
              src="/images/white-dropdown-icon.png"
            />
          </button>
          <div
            className={`category-box ${
              catbox === true ? "catvisible" : ""
            } row`}
          >
            {catswithsubcats.map((cat, i) => (
              <div key={i} className="category col-12 col-md-5 m-3 ">
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setcatfilterid(cat._id);
                    setcatselected(cat.catname);
                  }}
                >
                  {cat.catname}
                </span>
                {cat.subcategories.map((subcat, i) => (
                  <div key={i} className="subcategory">
                    <span
                      style={{ fontSize: "12px", cursor: "pointer" }}
                      onClick={() => {
                        setcatfilterid(subcat._id);
                        setcatselected(subcat.subcatname);
                        setcatbox(false);
                      }}
                    >
                      {subcat.subcatname}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="company-selector">
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <img src="./images/white-search-icon.png" height="25" />{" "}
              <input
                id="company-search"
                type="text"
                placeholder="Search Company"
                defaultValue="Search Company"
                onChange={(e)=>
                {
                  setcname(e.target.value);
                  handlecompanysearch();
                }
                }
              />
            </label>
            <div className="company-box">
              {!filteredcompanies.length>0?
              uniqueCompanies.map((item, i) => {
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="company"
                      value={item}
                      checked={companyfilter === item}
                      onChange={(e) => setcompanyfilter(e.target.value)}
                    />
                    &nbsp;&nbsp;<span>{item}</span>
                  </label>
                );
              }):filteredcompanies.map((item, i) => {
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="company"
                      value={item}
                      checked={companyfilter === item}
                      onChange={(e) => setcompanyfilter(e.target.value)}
                    />
                    &nbsp;&nbsp;<span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="price-slider">
            <span style={{ fontSize: "15px", color: "white" }}>
              Price Range
            </span>
            <div className="p-slider">
              <Slider
                range
                min={0}
                max={maxprice}
                step={1000}
                defaultValue={[0, 20000]}
                handleRender={handleRender}
                onChange={(e) => {
                  setpricerange(e);
                }}
                trackStyle={{
                  backgroundColor: "white",
                  height: 11,
                }}
                handleStyle={{
                  borderColor: "none",
                  height: 25,
                  width: 25,
                }}
                dotStyle={{
                  height: 10,
                  width: 10,
                  border: "none",
                  margin: -30,
                  marginLeft: 4,
                }}
                railStyle={{
                  backgroundColor: "grey",
                  border: "grey",
                  height: 11,
                }}
              />
              <div className="current-price">
                <span>
                  {" "}
                  {pricerange[0]} - {pricerange[1]}
                </span>
                &nbsp;&nbsp;
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() =>{
                    setpricefilter({min:pricerange[0],max:pricerange[1]})
                  }
                  }
                >
                  apply
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="contents-container">
          <form onSubmit={handlegadgetSearch} className="contents-container">
          <div className="search-bar">
            <input
              id="home-search"
              defaultValue="Search"
              type="text"
              placeholder="Search"
              value={gname}
              onChange={(e)=>setgname(e.target.value)}
            /><button type="submit" ><img src="/images/search-icon.png"/></button>
          </div>
          </form>
          <div className="filter-btns">
            <button
              id="search-filter"
              onClick={() =>{
                setlocalfilter("Latest")
              }}
              style={{
                backgroundColor: localfilter=== "Latest" ? "white" : "black",
                color: localfilter  === "Latest" ? "black" : "white",
              }}
            >
              latest
            </button>
            <button
              id="search-filter"
              onClick={() =>{
                setlocalfilter("Oldest")
              }}
              style={{
                backgroundColor: localfilter  === "Oldest" ? "white" : "black",
                color: localfilter  === "Oldest" ? "black" : "white",
              }}
            >
              oldest
            </button>
            <button
              id="search-filter"
              onClick={() => {
                setlocalfilter("Trending")
              }}
              style={{
                backgroundColor:   localfilter === "Trending" ? "white" : "black",
                color: localfilter  === "Trending" ? "black" : "white",
              }}
            >
              trending
            </button>
            <button
              id="search-filter"
              onClick={() => {
                setlocalfilter("Relevance")
              }}
              style={{
                backgroundColor: localfilter  === "Relevance" ? "white" : "black",
                color: localfilter=== "Relevance" ? "black" : "white",
              }}
            >
              Relevance
            </button>
          </div>
          <div className="bread-crumbs">
            {catfilterid && <div className="filter-active">
                  <p>{catselected}</p>
                  <button   onClick={() => setcatfilterid(null)}>
                    <img
                      src="/images/white-cancel-icon.png"
                    
                    />
                  </button>
                </div>}
              {companyfilter && <div className="filter-active">
                <p>{companyfilter}</p>
                <button   onClick={() => setcompanyfilter(null)}>
                  <img
                    src="/images/white-cancel-icon.png"
                  
                  />
                </button>
              </div>}
              {pricefilter && <div className="filter-active">
                <p>Budget:{pricefilter.min}-{pricefilter.max}</p>
                <button   onClick={() => setpricefilter(null)}>
                  <img
                    src="/images/white-cancel-icon.png"
                  
                  />
                </button>
              </div>}
              {localfilter && <div className="filter-active">
                <p>{localfilter}</p>
                <button  onClick={() => setlocalfilter(null)}>
                  <img
                    src="/images/white-cancel-icon.png"
                  />
                </button>
              </div>}
          </div>
          <div style={{width:'100%',borderBottom:"1px solid white",color:'white'}}> 
            <h4>Featured</h4>
          </div>
          <div className="gadgets-container">
            {dispgadgets.length>0?dispgadgets.map((gadget,i)=>
              {
                let date = new Date(gadget.launchdate);
                date= date.toLocaleString("en-IN",{
                  timeZone:"Asia/Kolkata",
                  day:"2-digit",
                  month:"short",
                  year:"numeric",
                });
              return(<Link to={`/gadget?gid=${gadget._id}`}  style={{ textDecoration: 'none' }} key={i} className="gadget-card" >
                <button
                  className="like-btn"
                  onClick={(e)=>{
                    e.preventDefault();
                    handlelikedGs(gadget._id)
                  }} // Handle button click
                >
                  <img src={likedgs?.includes(gadget._id) ? '/images/heart-selected.jpg' : '/images/heart.jpg'} alt="Like" />
                </button>
                <img
                  src={`${gadget.gadgetdisplaypic}`}
                />
                <div className="init-content">
                  <p style={{height:'20%',overflow:'hidden'}}>
                  {gadget.gadgetname}<br/> </p>
                  <span style={{fontSize:'11px',color:'grey'}}>Launch Date:  </span>{date}<br/>
                  <span style={{fontSize:'11px',color:'grey'}}>Price: </span>
                    ₹{gadget.price}
                </div>
              </Link>)}
            ):<h2>No Gadget Found :(</h2>}
          </div>
        </div>
      </div>
      </>}
      <Footer />
    </div>:
      <div className="home-body">
          <Header/>
              <div className="container d-flex justify-content-center align-items-center flex-column text-white" style={{boxSizing:'border-box', height:'100vh'}}>
              <img src="/images/gadgets+logowithmicro.png" style={{width:'50%'}}/><br/><br/>
              <h4>Loading...</h4>
              </div>
          <Footer/>
      </div>
    }</>
  );
}
