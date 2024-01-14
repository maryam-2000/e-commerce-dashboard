const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
    },
    customerName:{
        type: String,
        required:true,
    },
    customerId:{
        type: Number,
        required:true,
    },
    totalAmount:{
        type: Number,
        required:true,
    },
    productList: [
        {
            id:{
                type: Number,
                required:true,
            },
            name:{
                type: String,
                required:true,
            },
            category:{
                type: String,
                required:true,
            },
            price:{
                type: Number,
                required:true,
            },
            date:{
                type: Date,
                default:Date.now,
            },
            available:{
                type: Boolean,
                default:true,
            }
        }
      ],
    date:{
        type: Date,
        default:Date.now,
    },
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;