import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/pages/Shop/ProductCard.scss";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/shop/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img src={`/images/${product.id}.jpeg`} alt={product.name} className="product-image" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <h3 className="product-price">{product.price}</h3>
      <h3 className="product-likes">{product.likes}</h3>
    </div>
  );
};

export default ProductCard;
