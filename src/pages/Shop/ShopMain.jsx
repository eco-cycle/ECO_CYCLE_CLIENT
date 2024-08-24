import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import "../../styles/pages/Shop/ShopMain.scss";
import { getProduct } from '../../apis/shop/apis';

const ShopMain = () => {
  const [products, setProducts] = useState([]); // State to store product data
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search input
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response.statusCode === 200) {
          setProducts(response.data); // Access the data field
        } else {
          setError("Failed to fetch products. Please try again later.");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = Array.isArray(products) ? products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='shop-container'>
      <div className='shop-head'>
        <h2>제품몰</h2>
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
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopMain;
