import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/pages/Shop/ProductCard.scss";
import Point from '../../assets/Shop/Point.svg'; // Import the Point icon
import HeartIcon from '../../assets/Shop/Heart.svg'; // Assuming you have a heart icon

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const formatNumber = (num) => {
    return num.toLocaleString();
};

  const handleCardClick = () => {
    navigate(`/shop/${product.id}`);
  };

  

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img src={product.titleImageUrl} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <p className="product-description">{product.description}</p>
        <h3 className="product-name">{product.name}</h3>
        <img src={HeartIcon} alt="Heart" className="heart-icon" /> {/* Heart icon */}
        <div className="price-container">
          <img src={Point} alt="Point" className="point-icon" /> {/* Point icon */}
          <h3 className="product-price">{formatNumber(product.price)}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
