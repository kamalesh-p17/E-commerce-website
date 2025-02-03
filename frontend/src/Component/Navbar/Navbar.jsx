import React, { useContext, useState ,useRef} from 'react'
import './Navbar.css'
import logo from '../Asserts/logo.png'
import nav_dropdown from '../Asserts/nav_dropdown.png'
import cart_icon from '../Asserts/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
export const Navbar = () => {

  const [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef()

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-vissible');
    e.target.classList.toggle('open');
  }
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => {setMenu("shop")}}><Link style = {{ textDecoration: 'none', color: "#626262"}} to='/'>Shop</Link>{menu === "shop"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("men")}}><Link style = {{ textDecoration: 'none', color: "#626262"}} to='/mens'>Men</Link>{menu === "men"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("women")}}><Link style = {{ textDecoration: 'none', color: "#626262"}} to='/womens'>Women</Link>{menu === "women"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("kids")}}><Link style = {{ textDecoration: 'none', color: "#626262"}} to='/kids'>Kids</Link>{menu === "kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link onClick={() => {setMenu("Login")}} style = {{ textDecoration: 'none'}} to='/login'><button>Login</button></Link>
        <Link onClick={() => {setMenu("Cart")}} style = {{ textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}
