import React, {createContext, useEffect, useState} from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for(let i = 0; i < 300+1; i++){
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const [all_product,setAll_Product] = useState({});
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    })

    const addToCart = (itemId) => {
        setCartItems((prev) => {
          const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
          return updatedCart;
        });
      };
      
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }

    const resetCart = () => {
        setCartItems({});
    };

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItems = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {resetCart,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;