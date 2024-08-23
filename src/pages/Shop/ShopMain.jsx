import React, { useState } from 'react';
import ProductCard from './ProductCard';
import "../../styles/pages/Shop/ShopMain.scss";
import ProductData from './ProductData'; // Correctly import ProductData

const ShopMain = () => {
  const { products } = ProductData; // Extract the products array from ProductData
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search input

  // Filter products based on search input (name, category, or company)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='shop-container'>
      <div className='shop-head'>
        <h2>제품몰</h2>
        {/* Search Input Field */}
        <input
          type="text"
          placeholder="제품명, 카테고리, 브랜드 등으로 상품을 검색하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="shop-main">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopMain;
