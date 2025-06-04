import Footer from "./Footer";
import Header from "./Header";

export default function AboutUs()
{
    return(
        <>
            <Header/>
                <div className="home-body">
                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="row g-5">
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{minHeight: '400px'}}>
                                    <div className="position-relative h-100">
                                        <img className="img-fluid position-absolute w-100 h-100" src="/images/aboutuspic.jpg" alt="" style={{objectFit: 'cover'}}/>
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeInUp text-white" data-wow-delay="0.3s">
                                    <h6 className="section-title text-start text-white pe-3">About Us</h6>
                                    <h1 className="mb-4">Welcome to <span className="text-danger">Gadgets+</span></h1>
                                    <p className="mb-4">At Gadgets+, we’re passionate about technology and driven by the idea of making gadget shopping smarter, easier, and more informed. Our platform isn’t just another e-commerce site — it’s a tech hub where users can explore the latest gadgets, compare features, and get trusted insights from verified professionals.</p>
                                    <p className="mb-4">We combine the power of a modern online store with the credibility of expert reviews, ensuring that every purchase is backed by real knowledge and detailed analysis. Whether you're a casual buyer, a tech enthusiast, or an industry expert, Gadgets+ is designed to serve your needs with speed, security, and simplicity.</p>
                                    <p className="mb-4">Built using the latest in full-stack web development, we are committed to delivering a seamless, responsive, and secure experience for every user — from browsing and reviewing to purchasing and beyond.
<br/><br/>
<b>Gadgets+ – Buy smart. Stay informed.</b></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                
            <Footer/>
        </>
    )
}