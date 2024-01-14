import React from "react";
import './CSS/Admin.css';
import Sidebar from "../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";

const Admin = () => {
    // console.log(localStorage.getItem('isAdmin'));
    return (
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>}></Route>
                <Route path='/listproduct' element={<ListProduct/>}></Route>
            </Routes>
        </div>
    )
}

export default Admin