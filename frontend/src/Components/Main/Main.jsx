import React from "react";
import './Main.css';
import hand_icon from '../Assets/hand-icon.png';
import arrow from '../Assets/arrow.png';
import main_img from '../Assets/main-img.png';
import { Link } from "react-router-dom";

const Main = () => {
    const isAdminValue = localStorage.getItem('isAdmin');
    // console.log(isAdminValue);
    // isAdminValue === 'true' ? console.log("option 1") : console.log("option 2");

    return (
        <div className="main">
            <div className="main-left">
                {/* <h2>NEW SEASON</h2> */}
                <div>
                    <div className="main-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt=""/>
                    </div>
                    <p>Products</p>
                    <p>For everyone</p>
                </div>
                {isAdminValue === 'true'
                ?<Link to={'/admin'} style={{textDecoration:"none"}}>
                <div className="main-adminpanel-btn">
                <div>Admin Panel</div>
                <img src={arrow} alt=""/>
                </div></Link>
                :<div className="main-latest-btn">
                <div>Latest Products</div>
                <img src={arrow} alt=""/>
                </div>}
                
            </div>
            <div className="main-right">
                <img src={main_img} alt=""/>
            </div>
        </div>
    ) 
}

export default Main