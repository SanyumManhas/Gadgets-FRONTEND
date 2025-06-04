import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Modal from 'react-bootstrap/Modal';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import { UserContext } from "../App";

export default function Discussion()
{
    const [params] = useSearchParams();
    const pid = params.get("postid");

    const {userdata} = useContext(UserContext);

    const [post,setpost] = useState(null);
    const [loading,setloading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);
    const [imgshow,setimgshow] = useState(false);
    
    const [replies,setreplies] = useState([])

    const [replyc,setreplyc] = useState("")

    const fetchpreviewbyid = async()=>{
        try{
            setloading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getprbyid?id=${pid}`,{ withCredentials: true });
            if(result.data.success)
            {
                setpost(result.data.post);
            }
            else
            {
                toast.warn("Couldnt find the post!")
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
        finally{
            setloading(false);
        }
    }

    const handlereply = async()=>{
        try{
            const formdata = {pid, reply:replyc, name:userdata?.username,pic:userdata?.profilepic}
            
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/postreply`,formdata,{ withCredentials: true });

            if(result.data.success)
            {
                fetchreplies()
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
    }


    const fetchreplies = async()=>{
         try{
            setloading(true);

            const result = await axios.get(`${process.env.REACT_APP_API_URL}/getreplies?pid=${pid}`,{ withCredentials: true });
            if(result.data.success)
            {
                setreplies(result.data.replies)
            }
            else if(!result.data.success)
            {
                setreplies([]);
            }
        }
        catch(e)
        {
          toast.warn("Network error while getting replies " + e.message);
        }
        finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        if(pid) {
            fetchpreviewbyid()
            fetchreplies()
        }
    },[pid])

    useEffect(()=>{
        console.log(post);
    },[post])


    
    return(
        <>
        {!loading?
        
        <div className="home-body">
            <Header/>
            <div className="row text-white p-2 m-0">
                <h4>Discussion</h4>
                <hr/>
            </div>
            <div className="row m-0 d-flex justify-content-center">
                <div className="col-lg-10 border border-secondary bg-black p-5">
                    {/* head-> Name,Pic,Rating */}
                    <div className="container  d-flex flex-row text-white">
                        <img src={`/images/${post.profilepic}`} style={{width:'90px', height:'90px',objectFit:'cover',borderRadius:'100%'}}/>
                        &nbsp;
                        <div className="container">
                            <div className="container d-flex flex-row g-1">
                                <p style={{fontSize:'27px'}}>{post.username}</p>
                                <span> <AssignmentTurnedInIcon sx={{ marginLeft:'5px',fontSize: 27, color: 'lightblue'}} /></span>
                            </div>
                            <div className="container d-flex flex-row g-1 gap-3">
                                <p>
                                    {new Date(post.postdate).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    })}
                                </p>
                                <p>
                                    <Rating
                                        name="text-feedback"
                                        value={post.prating}
                                        readOnly
                                        precision={0.5}
                                        size="small"
                                        emptyIcon={<StarIcon style={{ opacity: 0.5,color:'white'}} fontSize="inherit" />}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="container text-white mb-3">
                        {post.review}
                    </div>
                    {/* Video and images */}
                    <Card
                        elevation={0}
                        sx={{
                            boxShadow: 'none',
                            p: 0,
                            m: 0,
                            backgroundColor: 'transparent',
                        }}
                        >
                        <Box
                            sx={{
                            p: 0,
                            m: 0,
                            backgroundColor: 'black',
                            lineHeight: 0, // removes bottom spacing caused by inline elements
                            }}
                        >
                            {post.video !== "novideo"?<video
                            controls
                            style={{
                                width: '100%',
                                display: 'block',
                                border: 'none',
                                outline: 'none',
                                margin: 0,
                                padding: 0,
                                backgroundColor: 'black',
                            }}
                            >
                            <source src={`${post.video}`} type="video/mp4" />
                            </video>:null}
                        </Box>
                        </Card>

                        <Box display="flex" margin="30px" justifyContent="start" padding="10px">
                            {post.images.map((img,i)=><><CardMedia
                            component="img"
                            height="154"
                            src={`${img}`}
                            alt="Sample video"
                            sx={{ width: '15%' }}
                            onClick={() =>{setimgshow(true); setSelectedImg(img)}}
                            />&nbsp;&nbsp;&nbsp;
                            </>)}
                        </Box> 

                        
                </div>
                <div className="col-lg-10 border border-secondary p-2 d-flex flex-column bg-black text-secondary gap-2">
                        <span>Replying to <span className="text-primary">@{post.username}</span></span>
                        <div className="container d-flex flex-row gap-3">
                            <img src={`/images/${userdata.profilepic}`} style={{width:'90px', height:'90px',objectFit:'cover',borderRadius:'100%'}}/>
                            <textarea className="form-control m-0 bg-black text-white" value={replyc} placeholder="Write a Reply" onChange={(e)=>setreplyc(e.target.value)}></textarea>
                        </div>
                        <div className="container d-flex flex-row-reverse">
                            <button onClick={handlereply}>Reply</button>
                        </div>
                </div>
                {replies.length>0?
                    <>
                        {
                            replies.map((reply,i)=>
                                <div className="col-lg-10 border border-secondary text-white p-4 bg-black">
                                    <div className="container  d-flex flex-row text-white">
                                        <img src={`/images/${reply.pic}`} style={{width:'60px', height:'60px',objectFit:'cover',borderRadius:'100%'}}/>
                                        &nbsp;
                                        <div className="container">
                                            <div className="container d-flex flex-row g-1 gap-2">
                                                <p style={{fontSize:'14px'}}>{reply.name}</p>
                                                <p style={{fontSize:'14px'}}>
                                                    {new Date(post.postdate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                             <p style={{fontSize:'18px'}}>
                                                {reply.reply}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                            )
                        }
                    </>
                
                :null}
            </div>
            <Footer/>
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
        </div>:<h2>Loading...</h2>}
        </>
    )
}