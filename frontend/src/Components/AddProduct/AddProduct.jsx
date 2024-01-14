import React, { useState } from "react";
import './AddProduct.css';

const AddProduct = () => {
    const [productDetails,setproductDetails] = useState({
        name:"",
        category:"fashion",
        price:""
    })

    const changeHandler = (e) => {
        setproductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const resetProductDetails = () => {
        setproductDetails({
          name: "",
          category: "fashion",
          price: ""
        });
      };

    const Add_Product = async () => {
        let product = productDetails;

        await fetch('http://localhost:4000/addproduct', {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Product Added Successfully!"):alert("Failed")
        })
        resetProductDetails();
    }

  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.price} onChange={changeHandler} type="number" name="price" placeholder="Type here" min={0} />
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                <option value="fashion">Fashion</option>
                <option value="food&beverages">Food & Beverages</option>
                <option value="other">Other</option>
            </select>
        </div>
        <button onClick={()=>{Add_Product()}} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct