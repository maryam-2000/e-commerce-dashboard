import React, { useContext } from "react";
import './Item.css';
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {

    // const {product} = props;
    const {addToCart} = useContext(ShopContext);

    return (
        <div className="item">
            {/* <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link> */}
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className="item-price">${props.price}</div>
            <button onClick={()=>{addToCart(props.id)}} className="add-to-cart">ADD TO CART</button>
        </div>
    )
}

export default Item