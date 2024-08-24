import React, { useState, useEffect } from 'react';
import Point from '../../assets/Shop/Point.svg'; // Import the Point icon
import "../../styles/pages/Shop/ShopPurchaseHistory.scss"; // Import the corresponding stylesheet
import { useNavigate } from 'react-router-dom';
import { getCartIn } from '../../apis/shop/apis'; // Import API function to get purchase history

const ShopPurchaseHistory = () => {
    const [purchaseItems, setPurchaseItems] = useState([]); // Initialize with an empty array
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            try {
                const response = await getCartIn(); // Fetch data using the API function
                console.log(response); // Log the response to inspect the structure
                setPurchaseItems(Array.isArray(response.data) ? response.data : []); // Extract and set the data array
            } catch (error) {
                console.error("Failed to fetch purchase history", error);
            }
        };

        fetchPurchaseHistory();
    }, []); // Empty dependency array ensures this runs once on component mount

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <div className="purchase-history-container">
            <div className="purchase-history-header">
                <h2>구매내역</h2>
            </div>

            {/* Map through purchased items */}
            {purchaseItems.length > 0 ? (
                purchaseItems.map(item => {
                    return (
                        <div key={item.productId} className="purchase-item">
                            <img src={item.imageUrl} alt={item.name} className="purchase-item-image" />
                            <div className="purchase-item-details">
                                <h3>{item.name}</h3>
                                <h4>구매 수량 : {item.count}개</h4>
                                <div className="price-container">
                                    <img src={Point} alt="Point" className="point-icon" /> {/* Point icon */}
                                    <h3 className="product-price">{formatNumber(parseInt(item.price))}</h3>
                                </div>
                                {/* <div className="purchase-date">
                                    구매 날짜: {new Date(item.purchaseDate).toLocaleDateString()}
                                </div> */}
                            </div>
                            <div className="total-price">{formatNumber(item.price * item.count)}</div>
                        </div>
                    );
                })
            ) : (
                <div className="no-purchase-items">구매 내역이 없습니다.</div> // Fallback message when there are no items
            )}
        </div>
    );
};

export default ShopPurchaseHistory;
