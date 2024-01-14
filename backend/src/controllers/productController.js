const Product = require('../models/productModel');

// =========================== Add Product ==============================
const addproduct = async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let product_array = products.slice(-1);
        let last_product = product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    });
}

// =========================== Remove Product ============================
const removeproduct = async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id}); 
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
}

// =========================== All Products ================================
const allproducts = async (req, res) => {
    let products = await Product.find({});
    res.send(products);
}

module.exports = {
    addproduct,
    removeproduct,
    allproducts
  };