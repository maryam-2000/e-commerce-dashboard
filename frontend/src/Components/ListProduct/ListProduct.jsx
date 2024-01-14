import React, { useEffect, useState } from "react";
import './ListProduct.css';
import cross_icon from '../Assets/cross_icon.png';

const ListProduct = () => {

  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <React.Fragment key={index}><div className="listproduct-format-main listproduct-format">
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
          </div>
          <hr />
          </React.Fragment>
        })}
      </div>
    </div>
  )
}

export default ListProduct