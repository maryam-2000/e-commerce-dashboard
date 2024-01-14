import * as React from "react";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import cross_icon from '../Components/Assets/cross_icon.png';
import './CSS/Orders.css';

const Orders = () => {
  const customerId = localStorage.getItem("customerId");
  const [allorders,setAllOrders] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  let formattedDates = [];

  const handleDateChange = (newDateRange) => {
    setSelectedDateRange(newDateRange);
  };

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilters = async () => {
    const startDate = formattedDates[0];
    const endDate = formattedDates[1];
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    // Construct the query string based on the selected filters
    const queryString = `?userId=${customerId}&startDate=${startDate}&endDate=${endDate}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
      const response = await fetch(`http://localhost:4000/filteredorders${queryString}`);
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
        console.error('Error fetching filtered orders:', error);
      }
  }

  const clearFilters = () => {
    handleDateChange([null, null]);
    setPriceRange([0, 100]);
    fetchInfo();
  }

  useEffect(() => {
    formattedDates = selectedDateRange.map(date => date ? dayjs(date).format('YYYY-MM-DD') : null);
  }, [formattedDates]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const fetchInfo = async () => {
    try {
        const response = await fetch(`http://localhost:4000/allorders?userId=${customerId}`);
        const data = await response.json();

        setAllOrders(data);
    } catch (error) {
        console.error('Error fetching user orders:', error);
    }
  };

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeOrder = async (id)=>{
    await fetch('http://localhost:4000/removeorder',{
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
    <div className="list-order">
      <div className="filters">
      <button onClick={toggleFilters} className="toggle-button">
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilters && (
        <div className="filter-container">
          <div className="price-filter">
            <Typography className="price-range-slider">
              Price Range:
            </Typography>
            <Box className="custom-box" sx={{ width: 300 }}>
              <Slider
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="price-range-slider"
                min={0}
                max={500}
              />
            </Box>
            <Typography className="price-text">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </Typography>
          </div>
          <div className="date-filter">
            <Typography className="date-range-interval">
              Date Interval:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  className="custom-date-range-picker"
                  value={selectedDateRange}
                  onChange={handleDateChange}
                  localeText={{
                    start: 'Start Date',
                    end: 'End Date',
                  }}
                />
            </LocalizationProvider>
          </div>
          <div className="apply-container">
            <button onClick={clearFilters} className="clear-button">Clear</button>
            <button onClick={applyFilters} className="apply-button">Apply</button>
          </div>
        </div>
      )}
      </div>
      <h1>My Orders</h1>
      <div className="listorder-format-main">
        <p>Order ID</p>
        <p>Products</p>
        <p>Total Amount</p>
        <p>Date</p>
        <p>Remove</p>
      </div>
      <div className="listorders-allorders">
        <hr />
        {allorders.map((order,index)=>{
          return <React.Fragment key={index}>
            <div className="listorder-format-main listorder-format">
            <p>{order.id}</p>
            <div>
              {order.productList.map((product) => (
              <div key={product.productId} className="listorder-product-details">
                <p>Product ID: <b>{product.id}</b> - Product Name: <b>{product.name}</b> - Price: <b>${product.price}</b></p>
              </div>
              ))}
            </div>
            <p>${order.totalAmount}</p>
            <p>{order.date.substring(0, 10)}</p>
            <img onClick={()=>{removeOrder(order.id)}} src={cross_icon} alt="" className="listorder-remove-icon" />
          </div>
          <hr />
          </React.Fragment>
        })}
      </div>
    </div>
  )
}

export default Orders