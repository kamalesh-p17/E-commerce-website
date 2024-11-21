import React from 'react';
import { Navbar } from './Component/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import { ShopCategory } from './Pages/ShopCategory';
import { Cart} from './Pages/Cart';
import {LoginSignup} from './Pages/LoginSignup';
import {Product} from './Pages/Product';
import {Shop} from './Pages/Shop';
import { Footer } from './Component/Footer/Footer';
import men_banner from './Component/Asserts/banner_mens.png';
import women_banner from './Component/Asserts/banner_women.png';
import kid_banner from './Component/Asserts/banner_kids.png';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory banner = {men_banner} category="men"/>}/>
          <Route path='/womens' element={<ShopCategory banner = {women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategory banner = {kid_banner} category="kid"/>}/>
          <Route path='/product/:productId'  element={<Product/>}/>  
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

      
    </div>
  )
}