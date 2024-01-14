import React from "react";
import './Sidebar.css';
import {Link} from 'react-router-dom';
import add_product_icon from '../Assets/addproduct.svg';
import list_products_icon from '../Assets/listproducts.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to="/admin/addproduct" style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" style={{width:"30px"}}/>
                <p>Add Product</p>
            </div>
        </Link>
        <Link to="/admin/listproduct" style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={list_products_icon} alt="" style={{width:"25px"}}/>
                <p>Products List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar