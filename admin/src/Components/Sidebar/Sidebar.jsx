import React, { useState } from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom';
import add_product_icon from '../../Asserts/Product_Cart.svg'
import list_product_icon from '../../Asserts/Product_list_icon.svg'

const Sidebar = () => {
    const [border, setBorder] = useState(null);
  return (
    <div className="sidebar">
        <Link to={'/addproduct'} onClick={() => setBorder('add')} style={{textDecoration: "none"}}>
            <div className="sidebar-item" style={{border:(border == 'add')? "1px solid black" : "none",borderRadius: "5px"}}>
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} onClick={() => setBorder('list')} style={{textDecoration: "none"}}>
            <div className="sidebar-item" style={{border:(border == 'list')? "1px solid black" : "none",borderRadius: "5px"}}>
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar