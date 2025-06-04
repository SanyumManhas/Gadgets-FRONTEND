import Footer from "./Footer";
import Header from "./Header";
import './Gadget.css'
import { useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Slider from "./Slider";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Icon , Menu,
  MenuItem,} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import MovingIcon from '@mui/icons-material/Moving';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import StarRateIcon from '@mui/icons-material/StarRate';
import ReviewBar from "./ReviewBar";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { UserContext } from "../App";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


export default function Gadget()
{
    // Context Variables
    const {userdata,cartupd,setcartupd} = useContext(UserContext);
    const nav = useNavigate();
    const [loading,setloading] = useState(true);
    const [srchresults,setsrchresults] = useState(false);

    
     const {handlelikedGs,likedgs} = useContext(UserContext);
    // States

    // Review States
    const [modalShow, setmodalShow] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [content,setcontent] = useState("")
    const [ucontent,setucontent] = useState("")
    const [images,setimages] = useState([])
    const [uimages,setuimages] = useState([])
    const [video,setvideo] = useState("")
    const [prating,setprating] = useState("");
    const [urating,seturating] = useState("");
    const [imgshow,setimgshow] = useState(false)
    const [latest,setlatest] = useState(false);
    const [highest,sethighest] = useState(false);
    const [reviewquery,setreviewquery] = useState("");
    const [reviewquerylist,setreviewquerylist] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [previews,setpreviews] = useState([]);
    const [ureviews,setureviews] = useState([]);
    const [uavgrating,setuavgrating] = useState(0);


    //Ecom section States
    const targetref = useRef(null);
    const [gadget,setgadget] = useState(null);
    const [likegadget,setlikegadget] = useState(false);
    const [date,setdate] = useState("");
    const [params] = useSearchParams();
    const gid = params.get("gid");
    const [newprice,setnewprice] = useState("");
    const [qty,setqty] = useState(1);
    const [avgrating,setavgrating] = useState(0);
    const [five,setfive] = useState(0)
    const [four,setfour] = useState(0)
    const [three,setthree] = useState(0)
    const [two,settwo] = useState(0)
    const [one,setone] = useState(0)
    const [ufive,setufive] = useState(0)
    const [ufour,setufour] = useState(0)
    const [uthree,setuthree] = useState(0)
    const [utwo,setutwo] = useState(0)
    const [uone,setuone] = useState(0)
    const [umodalShow,setumodalShow] = useState(false);
    const [similars,setsimilars] = useState([]);
    const [displaypreview,setdisplaypreview] = useState([]);




    // Functions

    //floating jump button
    const scrollToDiv = () => {
    targetref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    //Prof Review functions
    const handleremove = (id)=>{
        const updated = [...images];
        updated.splice(id,1);
        setimages(updated);
    } 

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlepost = async()=>{
        try{
            // gadgetid, username,userprofilephoto, written content,images,videos,rating,review date
            setloading(true)
            const formdata = new FormData();

            formdata.append("gid",gid)
            formdata.append("username",userdata?.username)
            formdata.append("profilepic",userdata?.profilepic)
            formdata.append("review",content)
            
            images.forEach(file=>{
                formdata.append("images",file);
            })
            
            formdata.append("video",video);


            formdata.append("prating",prating)
            
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/postreview`,formdata,{ withCredentials: true });

            if(result.data.success)
            {
                handleClose();
                fetchpreviews();
            }
            else
            {
                toast.warn("Try Again")
            }
        }
        catch(e)
        {
            console.log(e.message);
        }
        finally{
            setloading(false)
        }
    }


    const handleClose = () => setmodalShow(false);
    const handleShow = () =>  setmodalShow(true);

    const handlelike = async(id)=>{
        try{
            const apidata = {id,uid:userdata?._id}
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/setlike`,apidata,{ withCredentials: true });
            if(result.data.success)
            {
                fetchpreviews();
            }
            else if(!result.data.success)
            {
                console.log("Couldnt register like")
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

    const handledislike = async(id)=>{
        try{
            const apidata = {id,uid:userdata?._id}
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/setdislike`,apidata,{ withCredentials: true });
            if(result.data.success)
            {
                fetchpreviews();
            }
            else if(!result.data.success)
            {
                console.log("Couldnt register like")
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }


    const handlereviewquery = async ()=>{
        try
        {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/searchreviewq/${reviewquery}`,{ withCredentials: true });
            if(result.data.success)
            {
                setreviewquerylist(result.data.rvlist);
            }
            else
            {
                setreviewquerylist([]);
            }
        }
        catch(e)
        {
            toast.error("Error in searching");
            console.log("Error :" + e.message);
        }
    }

    const fetchpreviews = async()=>{
         try{
            if(!(previews.length>0))setloading(true);
            console.log("loading set to true from: fpreviews");
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/getpreviews?gid=${gid}`,{ withCredentials: true });
          if(result.data.success)
          {
            setpreviews(result.data.posts);
            setdisplaypreview(result.data.posts);
          }
          else if(!result.data.success)
          {
            console.log("Couldnt fetch categories")
            setpreviews([]);
          }
        }
        catch(e)
        {
          console.log(e);
        }
        finally{
            setloading(false)
            console.log("loading set to false from: fpreviews");
        }
    }


    // User reviews Functions

    const handleuclose = ()=>setumodalShow(false)
    const handleuShow = ()=>setumodalShow(true)

    const handleuserpost = async()=>{
        try{
            // gadgetid, username,userprofilephoto, written content,images,videos,rating,review date
            setloading(true)
            const formdata = new FormData();

            formdata.append("gid",gid)
            formdata.append("username",userdata?.username)
            formdata.append("profilepic",userdata?.profilepic)
            formdata.append("review",ucontent)
            
            uimages.forEach(file=>{
                formdata.append("images",file);
            })

            formdata.append("urating",urating)
            
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/postureview`,formdata,{ withCredentials: true });

            if(result.data.success)
            {
                handleuclose();
                toast.success("review Added");
                fetchureviews()
            }
            else
            {
                toast.warn("Try Again")
            }
        }
        catch(e)
        {
            console.log(e.message);
        }
        finally{
            setloading(false)
        }
    }

    const fetchureviews = async()=>{
         try{
            if(!(ureviews.length>0))setloading(true);
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/getureviews?gid=${gid}`,{ withCredentials: true });
          if(result.data.success)
          {
            setureviews(result.data.ureviews);
          }
          else if(!result.data.success)
          {
            console.log("Couldnt fetch categories")
            setureviews([]);
          }
        }
        catch(e)
        {
          console.log(e);
        }
        finally{
            setloading(false)
            console.log("loading set to false from: fpreviews");
        }
    }


    //Gadget and ecomm Functions
    const fetchgadgetsbygid = async()=>{
        try{
            setloading(true);
            console.log("loading set to true from: gbygid");
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getgadgetsbygid?gid=${gid}`,{ withCredentials: true });
            if(result.data.success)
            {
                if(result.data.gd)
                {
                  setgadget(result.data.gd);
                }
            }
            else if(!result.data.success)
            {
                setgadget(null);
            }
        }
        catch(e)
        {
          toast.warn("Network error while getting items " + e.message);
        }
        finally{
            setloading(false)
            console.log("loading set to false from: gbygid");
        }
    }

    const handlebuynow = ()=>{
        nav(`/checkout?gid=${gid}&qty=${qty}`)
    }

    const handleCart = async()=>{
        try{
            setloading(true)
            const cartitem ={uid:userdata?._id,qty,gname:gadget.gadgetname,img:gadget.gadgetdisplaypic,discount:gadget.discount,dprice:newprice}
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/addtocart`,cartitem,{ withCredentials: true });
            if(result.data.success)
            {
                setcartupd(!cartupd);
            }
            else
            {
                toast.error("Failed to add to Cart!, Try again")
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
        finally{
            setloading(false)
        }
    }
    

    const fetchsimilar = async()=>{
         try{
            setloading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getsimil?cid=${gadget.cid}&scid=${gadget.scid}`,{ withCredentials: true });
            if(result.data.success)
            {
               setsimilars(result.data.simi)
            }
            else if(!result.data.success)
            {
                setsimilars([]);
            }
        }
        catch(e)
        {
          toast.warn("Network error while getting similars " + e.message);
        }
        finally{
            setloading(false)
            console.log("loading set to false from: similars");
        }
    }
   

    // UseEffects->

    useEffect(()=>{
        if(reviewquerylist.length > 0)
        {
            setdisplaypreview(reviewquerylist);
            setsrchresults(true);
        }
    },[reviewquerylist])

    useEffect(()=>{
        if(gadget !== null)
        {
            let ogdate = new Date(gadget.launchdate);
            ogdate= ogdate.toLocaleString("en-IN",{
                timeZone:"Asia/Kolkata",
                day:"2-digit",
                month:"short",
                year:"numeric",
            });
            setdate(ogdate);
            setnewprice(gadget.price - (gadget.price*(gadget.discount/100)))
        }
    },[gadget])

    
    useEffect(()=>{
        if(gid !== null)
        {
            fetchgadgetsbygid();
            fetchpreviews();
            fetchureviews();  
        }
    },[gid]);

    useEffect(()=>{
        if(gadget !== null && similars.length === 0)
        {
            fetchsimilar();
        }
    },[gadget]);

    useEffect(()=>{
        if(highest === true)
        {
        let updated = [...previews];
        updated = updated.sort((a,b)=>b.prating - a.prating)
        setdisplaypreview(updated);
        }
        
    },[highest]);

    useEffect(()=>{
        if(latest === true)
       { console.log("Latest sorting called")
        let updated = [...previews];
        updated = updated.sort((a,b)=>new Date(b.postdate) - new Date(a.postdate))
        setdisplaypreview(updated);}
    },[latest])

    useEffect(()=>{
        if(previews.length > 0)
        {
            const total = previews.length;
            const score = previews.reduce((acc,item)=>{
                return acc += item.prating
            },0)
            console.log(score);
            let avg = parseFloat(score/total);
            avg = avg.toFixed(1);   
            setavgrating(avg);

            previews.forEach((review,i)=>{
                if(review.prating === 5)setfive(five +1);
                if(review.prating === 4)setfour(four+1);
                if(review.prating === 3)setthree(three + 1);
                if(review.prating === 2)settwo(two + 1);
                if(review.prating === 1)setone(one +1);
            })
        }
    },[previews])

    

    useEffect(()=>{
        if(ureviews.length > 0)
        {
            const total = ureviews.length;
            const score = ureviews.reduce((acc,item)=>{
                return acc += item.urating
            },0)
            let avg = parseFloat(score/total);
            avg = avg.toFixed(1);   
            setuavgrating(avg);

            let nfive = 0;
            let nfour = 0;
            let nthree = 0;
            let ntwo = 0;
            let none = 0;

            ureviews.forEach((review,i)=>{
                if(review.urating === 5)nfive = nfive+1
                if(review.urating === 4 || review.urating === 4.5)nfour = nfour+1
                if(review.urating === 3 || review.urating === 3.5)nthree = nthree+1
                if(review.urating === 2 || review.urating === 2.5)ntwo = ntwo+1
                if(review.urating === 1 || review.urating === 1.5 || review.urating === 0.5)none = none+1
            })

            setufive(nfive);
            setufour(nfour);
            setuthree(nthree);
            setutwo(ntwo);
            setuone(none);
        }
    },[ureviews])

    //fetched data to be checked->

    useEffect(() => {
    console.log("Modal image:", selectedImg);
    }, [selectedImg]);

    return(
        <>
        <button  className="jumptoreview" onClick={scrollToDiv}>Jump To Reviews ⬇️</button>
      {gadget && <>{!loading?<div className="home-body">
            <Header/>
            <div className="top row">
                <div className="display-gadget col-lg-7 col-md-12 col-sm-12">
                    <Slider>
                        {    gadget?.gadgetdisplaypics.map((url,i)=>
                                <img src={`${url}`} alt="slider pic" />
                            )   
                        }
                    </Slider>
                    {userdata && (gadget.stock > 0) && <div className="order-btns">
                        <button id="buy-now" onClick={handlebuynow}>Buy Now</button>
                        <button id="add-to-cart" onClick={handleCart}>Add to Cart</button>
                    <hr style={{color:'white'}}/>
                    </div>}
                </div>
        
                <div className="general-info col-lg-5 col-md-12 col-sm-12">
                    <button
                        id="gp-like-btn"
                         onClick={(e)=>{
                            e.preventDefault();
                            handlelikedGs(gadget._id)
                        }} 
                        >
                        <img src={likedgs?.includes(gadget._id) ? '/images/heart-selected.jpg' : '/images/heart.jpg'} alt="Like" />
                    </button>
                    <span id="title">{gadget.gadgetname}</span>
                    <span id="date"><span id="date-key">Launched On:</span>{date}</span>
                   <span id="rating-container"><span id="rating" style={{fontSize:'19px'}}> {uavgrating}<StarIcon sx={{fontSize:'14px',marginBottom:'5px'}}/>
                   </span><span id="ratings-qty">{previews.length} Reviews & {ureviews.length} ratings</span></span>
                    <hr style={{color:"white"}}/>
                    <span id="OurPrice-value"><span style={{fontSize:'28px',color:'red'}}>-{gadget.discount}%</span>&nbsp;₹{newprice}</span>
                    <span style={{color:'grey',padding:'4px',fontSize:'18px'}}>M.R.P.: {gadget.price}</span>
                    <select className="qnty" onChange={(e)=>setqty(e.target.value)}>
                        <option>Qty</option>
                        {Array.from({length:gadget.stock > 10?10:gadget.stock}).map((_,i)=>
                            <option key={i}>{i+1}</option>
                        )}
                    </select>
                    <hr style={{color:"white"}}/>
                    <div className="about-gadget">
                    {gadget.specifications.map((item,i)=>
                    <div key={i}>
                    <span id="abt-title">{item.title}</span>&nbsp;&nbsp;&nbsp;<span id="abt-desc">{item.desc}</span><br/>
                    </div>)}
                    </div>
                    <hr style={{color:"white"}}/>
                    <div className="specs-gadget">
                        <h4 style={{color:'white'}}>About this Item</h4>
                        <ul style={{fontSize:'16px',color:'white'}}>
                        {gadget.descriptions.map((item,i)=>
                        <li key={i}>{item}</li>)
                        }
                    </ul>
                    </div>
                </div>  
            </div>
            <div ref={targetref}>
            </div>    
                <div  className="Professionalreviews" >
                    <div className="container pt-3">
                           <hr style={{color:'white'}}/>
                        <h4 style={{color:'white'}}><b>Professional Reviews</b></h4>
                       <hr style={{color:'white'}}/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="rv-cn col-lg-4 ">
                                <div style={{fontSize:'24px'}}>Total Reviews</div>
                                <span style={{fontSize:'38px',marginRight:'25px'}}>
                                    {previews.length}
                                </span>
                                <span style={{padding:'5px',backgroundColor:'rgb(156, 255, 145)',borderRadius:'10px',width:'70px',fontSize:'14px',color:'green'}}>
                                    100% <MovingIcon sx={{fontSize:'16px'}}/>
                                </span>
                                <br/>
                                <span style={{fontSize:'14px'}}>
                                    Growth in reviews this year
                                </span>
                            </div>
                            <div className="rv-cn col-lg-4 ">
                                <div style={{fontSize:'24px'}}>Average Rating</div>
                                <span style={{fontSize:'38px',marginRight:'25px'}}>
                                    {avgrating}
                                </span>
                                <span>
                                
                                <Rating
                                    name="text-feedback"
                                    value={avgrating}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                             
                                </span>
                                <br/>
                                <span style={{fontSize:'14px'}}>
                                    Average rating this year
                                </span>
                            </div>
                            <div className="rv-cn col-lg-4 ">
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>5</span></div>} value={five} total={previews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>4</span></div>} value={four} total={previews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>3</span></div>} value={three} total={previews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>2</span></div>} value={two} total={previews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>1</span></div>} value={one} total={previews.length} />
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 m-0 ">
                        <div className="col-lg-8 m-0 text-white">
                            {srchresults?<h2>Search Results</h2>:null}
                            <ul style={{color:'white',fontSize:'40px', width:'100%'}}>
                            {displaypreview.length>0?
                            displaypreview.map((item,i)=><li style={{marginBottom:'20px'}}>
                            <Card
                                sx={{
                                    maxWidth: '99%',
                                    backgroundColor: 'rgb(10,10,10)',
                                    color: 'white', // sets default text color
                                    border: '1px solid white',
                                    borderRadius: '15px',
                                }}
                                >
                                <CardHeader
                                    avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        <img src={`/images/${item.profilepic}`} style={{objectFit:'cover', height:'100%'}}/>
                                    </Avatar>
                                    }
                                    action={
                                        <>
                                    <IconButton aria-label="settings"onClick={handleMenuOpen}>
                                        <MoreVertIcon sx={{color:'white'}}/>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        disableScrollLock
                                        onClose={handleMenuClose}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        >
                                        <MenuItem onClick={handleMenuClose} sx={{fontSize:'12px'}}>Report</MenuItem>
                                    </Menu>
                                    </>
                                    }
                                    title={
                                        <Box display="flex" alignItems="center" gap={1}>
                                        {item.username}
                                        <AssignmentTurnedInIcon sx={{ fontSize: 18, color: 'white' }} />
                                        </Box>
                                    }
                                    subheader={
                                        <Box display="flex" alignItems="center" gap={1} color="white" fontSize="14px">
                                            {new Date(item.postdate).toLocaleDateString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            })}
                                            <FiberManualRecordIcon sx={{fontSize:'12px'}}/><Rating
                                            name="text-feedback"
                                            value={item.prating}
                                            readOnly
                                            precision={0.5}
                                            size="small"
                                            emptyIcon={<StarIcon style={{ opacity: 0.5,color:'white' }} fontSize="inherit" />}
                                        />
                                        </Box>
                                    }
                                    
                                />

                                <CardContent>
                                    <Typography variant="body2" color="inherit">
                                    {item.review}
                                    </Typography>
                                </CardContent>

                               {item.video !== "novideo"? <Box display="flex" justifyContent="center">
                                    <CardMedia
                                    component="video"
                                    height="194"
                                    src={`${item.video}`}
                                    controls
                                    alt="Sample video"
                                    sx={{ width: '90%' ,marginBottom:'10px'}}
                                    />
                                </Box>:null }

                                <Box display="flex" justifyContent="start" padding="50px" >
                                   {item.images.map((img,i)=><>
                                   {/* <CardMedia
                                    component="img"
                                    height="154"
                                    src={`/images/${img}`}
                                    alt="Sample video"
                                    sx={{ width: '15%',objectFit:'cover' }}
                                    onClick={() =>{setimgshow(true); setSelectedImg(img)}}
                                    /> */}
                                    <img src={`${img}`} style={{height:'100px', objectFit:'cover'}}onClick={() =>{
                                        setSelectedImg(img);
                                        setimgshow(true);
                                    }}/>
                                    
                                    &nbsp;&nbsp;&nbsp;
                                    </>)}
                                </Box> 

                                <CardActions disableSpacing sx={{ flexDirection: 'row-reverse' }}>
                                    <IconButton aria-label="reply" onClick={()=>nav(`/discussion?postid=${item._id}`)}>
                                        <ReplyIcon sx={{color:'white'}}/>
                                    </IconButton>
                                    <IconButton aria-label="dislike" onClick={()=>handledislike(item._id)}>
                                        {item.dislikes.includes(userdata?._id)?<ThumbDownAltIcon sx={{color:'white'}}/>: <ThumbDownOffAltIcon sx={{color:'white'}}/>}
                                    </IconButton>
                                    
                                    <span style={{fontSize:'18px'}}>{item.dislikes.length>0?item.dislikes.length:null}</span>
                                    <span style={{fontSize:'20px',margin:'2px'}}>|</span>
                                   <span style={{fontSize:'18px'}}  >{item.likes.length>0?item.likes.length:null}</span>
                                    <IconButton aria-label="like"  onClick={()=>handlelike(item._id)}>
                                    {item.likes.includes(userdata?._id)?<ThumbUpAltIcon sx={{color:'white'}}/>:<ThumbUpOffAltIcon sx={{color:'white'}}/>}
                                    </IconButton>
                                    

                                </CardActions>
                                </Card>

                            </li>):null}
                            </ul>
                    </div>
                        <div className="col-lg-4 m-0 p-0 ">
                            <div className="row m-0">
                                <div className="col-lg-8 m-0 d-flex flex-row text-white">
                                            <input placeholder="search review" style={{background:'none',border:'none',color:'white',borderBottom:'2px solid white',marginRight:'12px'}} onChange={(e)=>setreviewquery(e.target.value)}/>
                                            <button onClick={handlereviewquery}>Search</button>
                                            <>
                                            
                                            <Modal
                                            size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            show={modalShow}
                                            onHide={handleClose}
                                            >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Add a Review for {gadget.gadgetname}
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {/* written content, images,videos */}
                                                <textarea autoFocus={true} placeholder="write review here" onChange={(e)=>setcontent(e.target.value)}></textarea>
                                                <p>Add image</p>
                                                <input type="file" onChange={(e)=>setimages([...images,e.target.files[0]])}/><br/><br/>
                                                {
                                                    images.length>0?
                                                    <>
                                                    {
                                                        images.map((item,i)=>
                                                        <div style={{margin:'10px'}}><img src={`${URL.createObjectURL(item)}`}height="150"/><br/>
                                                            <button className="displ-btn" onClick={()=>handleremove(i)}><img src="/images/cancel-icon.png" height="20"/></button>
                                                        </div>
                                                        )
                                                    }
                                                    </>:null
                                                }
                                                <p>Add a video</p>
                                                <input type="file" onChange={(e)=>setvideo(e.target.files[0])}/>
                                                <p>Rate the gadget</p>
                                                <Rating
                                                    name="text-feedback"
                                                    value={prating}
                                                    precision={0.5}
                                                    size="small"
                                                    onChange={(e)=>setprating(e.target.value)}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
                                                />

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={handleClose}>Close</Button>
                                                <Button onClick={handlepost}>Post</Button>
                                            </Modal.Footer>
                                            </Modal>
                                            </>
                                </div>
                                <div className="col-lg-12 text-white mt-4">
                                       {userdata?.userType === "professional"? <Button variant="danger" className="w-25 me-2 text-justify" onClick={handleShow}>
                                            Add Review
                                        </Button>:null}
                                    <span>SortBy:</span> <select onChange={(e)=>{
                                        console.log(e.target.value)
                                        if(e.target.value === "h")
                                        {
                                            sethighest(true)
                                            setlatest(false);
                                        }
                                        else if(e.target.value === "l")
                                        {
                                            setlatest(true);
                                            sethighest(false)
                                        }
                                        else
                                        {
                                            sethighest(false);
                                            setlatest(false);
                                        }
                                    }}>
                                        <option value="">Select</option>
                                        <option value="h">Highest Rated</option>
                                        <option value="l">Latest</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
                
                <div  className="Userreviews" >
                    
                    <div className="container pt-3">
                        <hr style={{color:'white'}}/>
                        <h4 style={{color:'white'}}><b>User Reviews</b></h4>
                        <hr style={{color:'white'}}/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="rv-cn col-lg-4">
                                <div style={{fontSize:'24px'}}>Average Rating</div>
                                <span style={{fontSize:'38px',marginRight:'25px'}}>
                                    {uavgrating}
                                </span>
                                <span>
                                
                                <Rating
                                    name="text-feedback"
                                    value={uavgrating}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                             
                                </span>
                                <br/>
                                <span style={{fontSize:'14px'}}>
                                    {ureviews.length} reviews
                                </span>
                            </div>
                            <div className="rv-cn col-lg-4 p-2">
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>5</span></div>} value={ufive} total={ureviews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>4</span></div>} value={ufour} total={ureviews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>3</span></div>} value={uthree} total={ureviews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>2</span></div>} value={utwo} total={ureviews.length} />
                                <ReviewBar label={<div className="d-flex "><StarRateIcon style={{fontSize:'24px',paddingBottom:'5px'}}/><span style={{fontSize:'20px'}}>1</span></div>} value={uone} total={ureviews.length} />
                            </div>
                            <div className="rv-cn col-lg-4 p-2">
                                <p style={{fontSize:'13px'}}>You Can Share your Own Personal Experience Also!, Click Below to add your own Review!</p>
                                <button className="form-control m-0" onClick={handleuShow}>Add a review</button>
                                
                                <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={umodalShow}
                                onHide={handleuclose}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            Add a User Review
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {/* written content, images,videos */}
                                        <textarea autoFocus={true} placeholder="write review here" onChange={(e)=>setucontent(e.target.value)}></textarea>
                                        <p>Add image</p>
                                        <input type="file" onChange={(e)=>setuimages([...images,e.target.files[0]])}/><br/><br/>
                                        {
                                            uimages.length>0?
                                            <>
                                            {
                                                uimages.map((item,i)=>
                                                <div style={{margin:'10px'}}><img src={`${URL.createObjectURL(item)}`}height="150"/><br/>
                                                    <button className="displ-btn" onClick={()=>handleremove(i)}><img src="/images/cancel-icon.png" height="20"/></button>
                                                </div>
                                                )
                                            }
                                            </>:null
                                        }
                                        <p>Rate the gadget</p>
                                        <Rating
                                            name="text-feedback"
                                            value={urating}
                                            precision={0.5}
                                            size="small"
                                            onChange={(e)=>seturating(e.target.value)}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
                                        />

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={handleuclose}>Close</Button>
                                        <Button onClick={handleuserpost}>Post</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className="container p-5">
                        <div className="row p-2">
                            {ureviews.map((review,i)=><div className="col-lg-4 mb-3">
                                <Card
                                sx={{
                                    maxWidth: '100%',
                                    backgroundColor: 'rgb(255, 247, 247)',
                                    color: 'black', // sets default text color
                                    border: '1px solid white',
                                    borderRadius: '15px',
                                }}
                                >
                                    <CardHeader
                                        avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            <img src={`/images/${review.profilepic}`} style={{objectFit:'cover', height:'100%'}}/>
                                        </Avatar>
                                        }
                                        action={
                                            <>
                                        <IconButton aria-label="settings"onClick={handleMenuOpen}>
                                            <MoreVertIcon sx={{color:'white'}}/>
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open}
                                            disableScrollLock
                                            onClose={handleMenuClose}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            >
                                            <MenuItem onClick={handleMenuClose} sx={{fontSize:'12px'}}>Report</MenuItem>
                                        </Menu>
                                        </>
                                        }
                                        title={
                                            <Box display="flex" alignItems="center" gap={1}>
                                            {review.username}
                                            <AssignmentTurnedInIcon sx={{ fontSize: 18, color: 'white' }} />
                                            </Box>
                                        }
                                        subheader={
                                            <Box display="flex" alignItems="center" gap={1}  fontSize="12px">
                                               {new Date(review.postdate).toLocaleDateString('en-GB',{
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                               })}
                                                <FiberManualRecordIcon sx={{fontSize:'12px'}}/>
                                                <Rating
                                                name="text-feedback"
                                                value={review.urating}
                                                readOnly
                                                precision={0.5}
                                                size="small"
                                                sx={{fontSize:'14px'}}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            </Box>
                                        }
                                        
                                    />

                                    <CardContent>
                                        <Typography variant="body2" color="inherit">
                                        {review.review}
                                        </Typography>
                                    </CardContent>

                                     <Box display="flex" justifyContent="start" paddingLeft="10px" paddingBottom="10px" height="70px">
                                        {review.images.map((img,i)=><>
                                            <img src={`${img}`} style={{height:'50px', objectFit:'cover',cursor:'pointer'}}
                                            onClick={() => {
                                            setSelectedImg(img);
                                            
                                            console.log("Selected image:", img);
                                            setTimeout(() => setimgshow(true), 0); // allow selectedImg to be set first
                                            }}

                                            />
                                            
                                            &nbsp;&nbsp;&nbsp;
                                            </>)}
                                        </Box> 

                                    </Card>
                            </div>)}
                            
                        </div>
                    </div>
                </div>

                <div  className="Professionalreviews" >
                    <div className="container pt-3 m-5">
                        <hr style={{color:'white'}}/>
                        <h4 style={{color:'white'}}><b>Similar To this</b></h4>
                        <hr style={{color:'white'}}/>
                        <div className="gadgets-container">
                        {similars.length>0?similars.filter((item,i)=>item._id!==gadget._id).map((gadget,i)=>
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
                            >
                            <img src={'/images/heart.jpg'} alt="Like" />
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
            <Footer/>
        </div>:
        
        <div className="home-body">
            <Header/>
                <div className="container d-flex justify-content-center align-items-center flex-column text-white" style={{boxSizing:'border-box', height:'100vh'}}>
                <img src="/images/gadgets+logowithmicro.png" style={{width:'50%'}}/><br/><br/>
                <h4>Loading...</h4>
                </div>
            <Footer/>
        </div>
        
        
        }</>}

         <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={imgshow}
            onHide={()=>{setimgshow(false); setSelectedImg(null)}}
            >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <img src={`${selectedImg}`} height="500"/>
            </Modal.Body>
        </Modal>

                               

        </>
    )
}