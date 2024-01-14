import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Orders from './Pages/Orders';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import LoginSignup from './Pages/LoginSignup';
import Admin from './Pages/Admin.jsx';
// const config = require('./config.js');

function App() {
  // if(config.isFirstTimeStartup){
  //   localStorage.removeItem('auth-token');

  //   config.isFirstTimeStartup = false;
  //   flag = false;
  // }
  // console.log(localStorage.getItem('auth-token'));
  // console.log(localStorage.getItem('customerId'));
  // console.log(localStorage.getItem('customerName'));
  // console.log(localStorage.getItem('isAdmin'));
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/fashion' element={<ShopCategory category="fashion"/>}/>
          <Route path='/food&beverages' element={<ShopCategory category="food&beverages"/>}/>
          <Route path='/other' element={<ShopCategory category="other"/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
