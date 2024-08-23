import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/pages/Shop/ProductDetail.scss";
import ProductData from './ProductData'; // Import your ProductData file
import Point from '../../assets/Shop/Point.svg'; // Import the Point icon
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const product = ProductData.products.find((product) => product.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('info'); // State to manage the active tab

  const navigate=useNavigate();
  if (!product) return <div>Product not found</div>;

  const handlecart=()=>{
    navigate('/cart');
}
  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-company">{product.seller}</div>
        <h1 className="product-name">{product.name}</h1>
        <div className="price-container">
          <img src={Point} alt="Point" className="point-icon" /> {/* Point icon */}
          <h3 className="product-price">{product.price}</h3>
        </div>
        <div className="shipping-info">
          <div>배송기간: 평균 2~3일 내 출고</div>
        </div>

        {/* Info Tabs */}
        <div className="info-tabs">
          <button 
            className={`tab ${activeTab === 'info' ? 'active' : ''}`} 
            onClick={() => setActiveTab('info')}
          >
            정보
          </button>
          <button 
            className={`tab ${activeTab === 'seller' ? 'active' : ''}`} 
            onClick={() => setActiveTab('seller')}
          >
            판매자 정보
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`} 
            onClick={() => setActiveTab('reviews')}
          >
            후기
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="tab-content">
          {activeTab === 'info' && <div>해당 제품은 자원을 재활용하여 만든<br/>
          환경을 생각하여 만든 제품입니다.<br/>
          재활용한 자원으로 만들었음에도<br/>
          결코 떨어지지 않는 품질입니다.</div>}
          {activeTab === 'seller' && <div>판매자 정보 내용입니다.</div>}
          {activeTab === 'reviews' && <div>후기 내용입니다.</div>}
        </div>
      </div>

      {/* Buy Button Fixed at the Bottom */}
      <button className="buy-button" onClick={handlecart}>장바구니</button>
    </div>
  );
};

export default ProductDetail;
