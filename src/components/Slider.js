import { useEffect, useRef, useState } from 'react'
import './Slider.css'

export default function Slider({children})
{
    const slidesRef = useRef();
    const [currentIndex,setcurrentIndex] = useState(0);

    const sliderContents = ()=>{
        const children = slidesRef.current.children;
        const total = children.length - 2;
        
        return {children,total}
    }
    useEffect(()=>{
        const {children,total} = sliderContents();
        if(total > 0)
        {
            children[total - 1].classList.add('active-left');
            children[0].classList.add('active');
            children[1].classList.add('active-right');
        }
    },[children])

    const handleleft = ()=>{
        const {children,total} = sliderContents();
        setcurrentIndex((prev)=>{
            const left = prev === 0?total - 1: prev - 1;
            const right = prev === total - 1? 0: prev + 1;

            children[left].classList.remove('active-left');
            children[prev].classList.remove('active');
            children[right].classList.remove('active-right');
            
            const next = left === 0? total - 1: left - 1; 
            
            children[next].classList.add('active-left');
            children[left].classList.add('active');
            children[prev].classList.add('active-right');
            
            return left;
        });
    }

    const handleright = ()=>{

        const {children,total} = sliderContents();
        setcurrentIndex((prev)=>{
            const left = prev === 0?total - 1: prev - 1;
            const right = prev === total - 1? 0: prev + 1;

            children[left].classList.remove('active-left');
            children[prev].classList.remove('active');
            children[right].classList.remove('active-right');
            
            const next = right === total - 1? 0: right + 1;

            children[prev].classList.add('active-left');
            children[right].classList.add('active');
            children[next].classList.add('active-right');

            return right;
        });
    
    }

    const handleguide = (index)=>{
        const {children,total} = sliderContents();
        setcurrentIndex((prev)=>{
            const left = prev === 0?total - 1: prev - 1;
            const right = prev === total - 1? 0: prev + 1;

            children[left].classList.remove('active-left');
            children[prev].classList.remove('active');
            children[right].classList.remove('active-right');
            
           const newleft = index === 0?total - 1: index - 1;
           const newright = index === total-1?0:index + 1;

            children[newleft].classList.add('active-left');
            children[index].classList.add('active');
            children[newright].classList.add('active-right');

            return index;
        });
    
    }

    return(
        <div className="container">
            <div ref={slidesRef} className="slider-container">
                    {children}
                    <div className="navigate left-btn">
                        <button  onClick={handleleft}><img id="btn-img" src="./images/gadget-slider-left.png" /></button>
                    </div>
                    <div className="navigate right-btn">
                        <button onClick={handleright}><img id="btn-img" src="./images/gadget-slider-right.png"/></button>
                    </div>
            </div>
            <div className="guides">
                {
                    children.map((item,i)=>
                    <button key ={i} onClick={()=>handleguide(i)}>{item}</button>
                    )
                }
            </div>
         
        </div>
    )
}