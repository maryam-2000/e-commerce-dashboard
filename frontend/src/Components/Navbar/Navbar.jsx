import React, { useContext, useRef, useState } from "react";
import './Navbar.css';
import logo from '../Assets/logo-icon.svg';
import cart from '../Assets/cart.svg';
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/dropdown.svg';

const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();
    const token = localStorage.getItem('auth-token');

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt=""/>
                <p>SHOP</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none', color: '#626262'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("fashion")}}><Link style={{ textDecoration: 'none', color: '#626262'}} to='/fashion'>Fashion</Link>{menu==="fashion"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("food")}}><Link style={{ textDecoration: 'none', color: '#626262'}} to='/food&beverages'>Food & Beverages</Link>{menu==="food"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("other")}}><Link style={{ textDecoration: 'none', color: '#626262'}} to='/other'>Other</Link>{menu==="other"?<hr/>:<></>}</li>
                {token?<li onClick={()=>{setMenu("orders")}}><Link style={{ textDecoration: 'none', color: '#626262'}} to='/orders'>Orders</Link>{menu==="orders"?<hr/>:<></>}</li>:<></>}
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('customerName');
                localStorage.removeItem('customerId');
                window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button onClick={()=>{setMenu("")}}>Login</button></Link>}
                <Link to='/cart'><img onClick={()=>{setMenu("")}} src={cart} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar