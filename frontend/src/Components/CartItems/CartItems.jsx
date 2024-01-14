import React, { useContext, useState } from "react";
import './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const {resetCart,getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);

    const customerName = localStorage.getItem("customerName");
    const customerId = localStorage.getItem("customerId");
    // const token = localStorage.getItem("auth-token");

    const itemsInCart = [];
    // Iterate over all products
    all_product.forEach((product) => {
        const quantity = cartItems[product.id];

        // Check if the product is in the cart (quantity > 0)
        if (quantity > 0) {
            // Add the product to the itemsInCart array for each occurrence
            for (let i = 0; i < quantity; i++) {
                itemsInCart.push(product);
            }
        }
    });

    const [orderDetails] = useState({
        customerName:customerName,
        customerId:customerId,
        totalAmount:getTotalCartAmount(),
        productList:itemsInCart
    })

    const createOrder = async () =>{
        if(customerId == null){
            alert("You need to log in first!");
        }
        else if(customerId !== null && itemsInCart.length !== 0){
            let order = orderDetails;
            await fetch('http://localhost:4000/createorder', {
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(order),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Order Created Successfully!"):alert("Failed")
            })
            window.location.replace('/');
            resetCart();
        }
        else if(itemsInCart.length === 0){
            alert("You need to add items first");
        }
    }


    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                    return <div key={e.id}>
                    <div className="cartitems-format cartitems-format-main">
                        <p>{e.name}</p>
                        <p>${e.price}</p>
                        <button className="cartitems-quantity">{cartItems[e.id]}</button>
                        <p>${e.price * cartItems[e.id]}</p>
                        <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>(removeFromCart(e.id))} alt="" />
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={()=>{createOrder()}}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems