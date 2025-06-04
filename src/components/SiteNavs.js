import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import NotFound from './NotFound'
import Adminhome from './Adminhome'
import ManageUsers from './ManageUsers'
import ManageGadgets from './ManageGadgets'
import ManageCategories from './ManageCategories'
import User from './User'
import ManageSubCategories from './ManageSubCategories'
import Gadget from './Gadget'
import Checkout from './Checkout'
import OrderHistory from './OrderHistory'
import Order from './Order'
import Discussion from './Discussion'
import LikedGadgets from './LikedGadgets'
import AboutUs from './Aboutus'
import ContactUs from './ContactUs'
import ProfApplication from './ProfApplication'
import RoutesProtector from './RoutesProtector'
import ForgotPass from './ForgotPass'
import ResetPass from './ResetPass'
export default function SiteNavs(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/homepage" element={<Home/>}></Route>
            <Route path="/gadget" element={<RoutesProtector CompName={Gadget}/>}></Route>
            <Route path="/manageusers" element={<RoutesProtector CompName={ManageUsers}/>}></Route>
            <Route path="/managegadgets" element={<RoutesProtector CompName={ManageGadgets}/>}></Route>
            <Route path="/managecats" element={<RoutesProtector CompName={ManageCategories}/>}></Route>
            <Route path="/managesubcats" element={<RoutesProtector CompName={ManageSubCategories}/>}></Route>
            <Route path="/admin" element={<RoutesProtector CompName={Adminhome}/>}></Route>
            <Route path="/user" element={<RoutesProtector CompName={User}/>}></Route>
            <Route path="/login" element={<RoutesProtector CompName={Login}/>}/>
            <Route path="/signup" element={<RoutesProtector CompName={Signup}/>}/>
            <Route path="/checkout" element={<RoutesProtector CompName={Checkout}/>}/>
            <Route path="/orders" element={<RoutesProtector CompName={OrderHistory}/>}/>
            <Route path="/order" element={<RoutesProtector CompName={Order}/>}/>
            <Route path="/discussion" element={<RoutesProtector CompName={Discussion}/>}/>
            <Route path="/likedgadgets" element={<RoutesProtector CompName={LikedGadgets}/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
            <Route path="/forgotpass" element={<ForgotPass/>}/>
            <Route path="/resetpass/:token" element={<ResetPass/>}/>
            <Route path="/professionalapplication" element={<ProfApplication/>}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}