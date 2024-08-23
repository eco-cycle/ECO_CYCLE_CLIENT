import React from 'react';
import ProductCard from './ProductCard';
import "../../styles/pages/Shop/ShopMain.scss";
import ProductData from './ProductData'; // Correctly import ProductData

const ShopMain = () => {
  const { products } = ProductData; // Extract the products array from ProductData

  return (
    <div className='shop-container'>
      <div className='shop-head'>
        <h1>Upcycling Shop</h1>
        <div>Search</div>
      </div>
      <div className="shop-main">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopMain;
