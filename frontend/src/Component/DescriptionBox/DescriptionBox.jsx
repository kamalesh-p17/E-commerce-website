import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>This eCommerce website offers a wide range of categories to meet all your needs, whether you’re looking to refresh your wardrobe, upgrade your gadgets, or redecorate your space. With a focus on exceptional value, fast delivery, and secure payments, the site is designed to make shopping seamless and enjoyable from start to finish.</p>
        <p>This eCommerce website is dedicated to bringing you the latest trends and timeless essentials in fashion, with a wide selection for men, women, and kids.</p>
      </div>
    </div>
  )
}
