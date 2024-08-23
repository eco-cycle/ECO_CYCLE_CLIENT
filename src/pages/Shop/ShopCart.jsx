import React, { useState, useEffect } from 'react';
import ProductData from './ProductData';
import Point from '../../assets/Shop/Point.svg'; // Import the Point icon
import "../../styles/pages/Shop/ShopCart.scss";
import { useNavigate } from 'react-router-dom';

const ShopCart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 2, quantity: 1 }, // 쇼핑백 2개
    ]);

    const [mypoint, setMypoint] = useState(20000);
    const [exitpoint, setExitpoint] = useState(mypoint);
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([2, 3]); // Track selected items by their IDs

    // Fetch product details from ProductData based on product ID
    const getProductDetails = (id) => ProductData.products.find(product => product.id === id);

    // Update the quantity of items in the cart
    const updateQuantity = (id, amount) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
            )
        );
    };

    // Toggle the selection of an item
    const toggleSelectItem = (id) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    };

    // Calculate the total price of the selected items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectedItems.includes(item.id)) {
                const product = getProductDetails(item.id);
                const productPrice = Number(product.price); // Ensure the price is a number
                return total + (productPrice * item.quantity);
            }
            return total;
        }, 0);
    };

    // Calculate remaining points after purchase
    useEffect(() => {
        const total = calculateTotal();
        setExitpoint(mypoint - total);
    }, [mypoint, cartItems, selectedItems]);

    const handleBuy = () => {
        // Assuming the purchase is successful, deduct the points
        setMypoint(exitpoint);
        navigate('/');
    };

    // Remove an item from the cart
    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        setSelectedItems(prevSelected => prevSelected.filter(itemId => itemId !== id));
    };

    // Format numbers with commas
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>장바구니</h2>
            </div>

            {/* Map through cart items */}
            {cartItems.map(item => {
                const product = getProductDetails(item.id);

                // Ensure product exists before rendering
                if (!product) return null;

                return (
                    <div key={item.id} className="cart-item">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelectItem(item.id)}
                        />
                        <img src={product.image} alt={product.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{product.name}</h3>
                            <h4>선택한 옵션</h4>
                            <div className="price-container">
                                <img src={Point} alt="Point" className="point-icon" /> {/* Point icon */}
                                {/* Display the product price directly, formatted with commas */}
                                <h3 className="product-price">{formatNumber(parseInt(product.price))}</h3>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                        </div>
                        {/* Display the total price for this product, formatted with commas */}
                        <div className="total-price">{formatNumber(product.price * item.quantity)}</div>
                        <button className="remove-button" onClick={() => removeItem(item.id)}>×</button>
                    </div>
                );
            })}

            <div className="cart-summary">
                <div className="summary-row">
                    <div className='price-type buy'>결제 예정 금액</div>
                    <div className="price-container">
                        <img src={Point} alt="Point" className="point-icon" />
                        <div className='point-wallet buy'>{formatNumber(calculateTotal())}</div> {/* Total price correctly calculated and formatted */}
                    </div>
                </div>
                <div className="summary-row">
                    <div className='price-type'>보유한 포인트</div>
                    <div className="price-container">
                        <img src={Point} alt="Point" className="point-icon" />
                        <div className="point-wallet">{formatNumber(mypoint)}</div>
                    </div>
                </div>
                <div className="summary-row">
                    <div className='price-type'>구매 후 포인트</div>
                    <div className="price-container">
                        <img src={Point} alt="Point" className="point-icon" />
                        <div className="point-wallet">{formatNumber(exitpoint)}</div>
                    </div>
                </div>
                <button className="checkout-button" onClick={handleBuy}>구매하기</button>
            </div>
        </div>
    );
};

export default ShopCart;
