import { useEffect, useRef, useState } from 'react';
import './Carousel.css'

const Carousel = ({gadgets,children})=>{

    const [currentIndex,setcurrentIndex] = useState(0);
    const [activeIndex,setactiveIndex] = useState(0);

    const slidesRef = useRef();

    const slides = ()=>{
        const children = slidesRef.current.children;
        const total = children.length;
        
        return {children,total}
    }

    useEffect(()=>{
        const {children,total} = slides();
        if(total > 0)
        {
            children[total - 1]?.classList.add('current-left');
            children[0]?.classList.add('current');
            children[1]?.classList.add('current-right');
        }

    },[children])
    const intervalRef = useRef();
    useEffect(()=>{
        setactiveIndex(currentIndex);
    },[currentIndex])
    useEffect(()=>{
        callcarousel();

        return()=>clearInterval(intervalRef.current)
    },[]);

    const callcarousel = ()=>{
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const {children,total} = slides();
            setcurrentIndex((prev)=>{
                const left = prev === 0?total - 1: prev - 1;
                const right = prev === total - 1? 0: prev + 1;
    
                children[left].classList.remove('current-left');
                children[prev].classList.remove('current');
                children[right].classList.remove('current-right');
                
                const next = left === 0? total - 1: left - 1; 
                // showAnimation-r 1s ease-in-out forwards
                
                children[next].classList.add('current-left');
                children[left].classList.add('current');
                children[prev].classList.add('current-right');
    
                return left;
            });
        }, 6500);
    }

    const handleright = ()=>{
        clearInterval(intervalRef.current);
        const {children,total} = slides();
        setcurrentIndex((prev)=>{
            const left = prev === 0?total - 1: prev - 1;
            const right = prev === total - 1? 0: prev + 1;

            children[left].classList.remove('current-left');
            children[prev].classList.remove('current');
            children[right].classList.remove('current-right');
            
            const next = right === total - 1? 0: right + 1;

            children[prev].classList.add('current-left');
            children[right].classList.add('current');
            children[next].classList.add('current-right');

            return right;
        });
        callcarousel();
    }
    const handleleft = ()=>{
        clearInterval(intervalRef.current);
        const {children,total} = slides();
        setcurrentIndex((prev)=>{
            const left = prev === 0?total - 1: prev - 1;
            const right = prev === total - 1? 0: prev + 1;

            children[left].classList.remove('current-left');
            children[prev].classList.remove('current');
            children[right].classList.remove('current-right');
            
            const next = left === 0? total - 1: left - 1; 
            
            children[next].classList.add('current-left');
            children[left].classList.add('current');
            children[prev].classList.add('current-right');
            
            return left;
        });
        callcarousel();
    }
    const handleping = (index)=>{
        clearInterval(intervalRef.current);
        const {children,total} = slides();
        setcurrentIndex((prev)=>{
            console.log("prev", prev)
            console.log("index", index)

            const prevleft = prev === 0?total - 1: prev - 1;
            const prevright = prev === total - 1? 0: prev + 1;

            console.log("prevleft", prevleft)
            console.log("prevright", prevright)

            const left = index === 0?total - 1: index - 1;
            const right = index === total - 1? 0: index + 1;

            console.log("left",left)
            console.log("right",right)

            children[prevleft].classList.remove('current-left');
            children[prev].classList.remove('current');
            children[prevright].classList.remove('current-right');
            
            children[left].classList.add('current-left');
            children[index].classList.add('current');
            children[right].classList.add('current-right');

            return index;
        });
        callcarousel();
    }
    return(
        <div onMouseEnter={()=>clearInterval(intervalRef.current)} onMouseLeave={callcarousel} className="carousel">
            <div ref={slidesRef} className="slides">
                {children}
            </div>
            <button className="arrow arrow-left" onClick={handleleft}><img src="./images/carousel-arrow-icon-left.png" /></button>
            <button className="arrow arrow-right" onClick={handleright}><img src="./images/carousel-arrow-icon.png"/></button>
            <div className="pings">
                {Array.from({length:children.length}).map((_,i)=>
                  <button key={i} className={`ping ${activeIndex === i ? 'active': ''}`} onClick={()=>handleping(i)}></button>)
                }   
            </div>
        </div>
    )
}
export default Carousel