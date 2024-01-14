const Order = require('../models/orderModel');

// ========================== Create Order ==========================
const createorder = async (req, res) => {
    try {
        const { customerName, customerId, totalAmount, productList } = req.body;
        console.log(productList);
    
        let orders = await Order.find({});
        let id;
    
        if (orders.length > 0) {
          let order_array = orders.slice(-1);
          let last_order = order_array[0];
          id = last_order.id + 1;
        } else {
          id = 1;
        }
    
        const order = new Order({
          id: id,
          customerName: customerName,
          customerId: customerId,
          totalAmount: totalAmount,
          productList: productList,
        });
    
        console.log(order);
        await order.save();
        console.log('Saved');
        res.json({
          success: true,
          name: customerName,
        });
    } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// ========================== Remove Order ==========================
const removeorder = async (req, res) => {
    await Order.findOneAndDelete({id:req.body.id}); 
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
}

// ========================== All Orders ==========================
const allorders = async (req, res) => {
    try {
        const userId = req.query.userId;
        // Fetch orders for the specific user
        const orders = await Order.find({ customerId: userId });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, errors: 'Internal Server Error' });
    }
}

// ========================== Filtered Orders ==========================
const filteredorders = async (req, res) => {
    try {
        // Extract the filter parameters from the query string
        const { userId, startDate, endDate, minPrice, maxPrice } = req.query;
    
        // Construct the filter object based on the provided parameters
        const filter = {};
        filter.customerId = userId;
        if (startDate !== null && endDate !== null) {
            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);
            if (!isNaN(parsedStartDate.getTime()) && !isNaN(parsedEndDate.getTime())) {
                filter.date = { $gte: parsedStartDate, $lte: parsedEndDate };
            }
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
          filter.totalAmount = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        }
    
        // Fetch orders based on the constructed filter
        const filteredOrders = await Order.find(filter);
    
        // Respond with the filtered orders
        res.json(filteredOrders);
        console.log(filteredOrders);
    } catch (error) {
        console.error('Error fetching filtered orders:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    createorder,
    removeorder,
    allorders,
    filteredorders
  };