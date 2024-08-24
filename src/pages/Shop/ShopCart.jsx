import React, { useState, useEffect } from 'react';
import Point from '../../assets/Shop/Point.svg'; // Import the Point icon
import "../../styles/pages/Shop/ShopCart.scss";
import { useNavigate } from 'react-router-dom';
import { getCartIn, delCartIn, plusCartIn, minusCartIn } from '../../apis/shop/apis'; // Import API functions

const ShopCart = () => {
    const [cartItems, setCartItems] = useState([]); // Initialize with an empty array
    const [mypoint, setMypoint] = useState(20000);
    const [exitpoint, setExitpoint] = useState(mypoint);
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]); // Initialize selected items

    // Fetch cart items from the API when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const data = await getCartIn();
                console.log(data);
                setCartItems(data.data); // Assuming data.data is an array of cart items
                setSelectedItems(data.data.map(item => item.productId)); // Select all items by default
            } catch (error) {
                console.error("Failed to fetch cart items", error);
            }
        };

        fetchCartItems();
    }, []); // Empty dependency array to run once on mount

    // Update the count of items in the cart
    const updatecount = async (productId, amount) => {
        try {
            if (amount > 0) {
                await plusCartIn(productId); // Call the API to increase quantity
            } else {
                await minusCartIn(productId); // Call the API to decrease quantity
            }

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, count: Math.max(item.count + amount, 1) } : item
                )
            );
        } catch (error) {
            console.error("Failed to update item count in cart", error);
        }
    };

    // Toggle the selection of an item
    const toggleSelectItem = (productId) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(productId)
                ? prevSelected.filter(itemId => itemId !== productId)
                : [...prevSelected, productId]
        );
    };

    // Calculate the total price of the selected items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectedItems.includes(item.productId)) {
                const productPrice = Number(item.price); // Ensure the price is a number
                return total + (productPrice * item.count);
            }
            return total;
        }, 0);
    };

    // Remove an item from the cart
    const removeItem = async (productId) => {
        try {
            await delCartIn(productId); // Call the API to remove the item

            setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
            setSelectedItems(prevSelected => prevSelected.filter(itemId => itemId !== productId));
        } catch (error) {
            console.error("Failed to remove item from cart", error);
        }
    };

    // Format numbers with commas
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    const handleBuy = () => {
        navigate('/shophistory');

    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>장바구니</h2>
            </div>

            {/* Map through cart items */}
            {cartItems.map(item => {
                return (
                    <div key={item.productId} className="cart-item">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.productId)}
                            onChange={() => toggleSelectItem(item.productId)}
                        />
                        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <h4>선택한 옵션</h4>
                            <div className="price-container">
                                <img src={Point} alt="Point" className="point-icon" /> {/* Point icon */}
                                <h3 className="product-price">{formatNumber(parseInt(item.price))}</h3>
                            </div>
                            <div className="count-controls">
                                <button onClick={() => updatecount(item.productId, -1)}>-</button>
                                <span>{item.count}</span>
                                <button onClick={() => updatecount(item.productId, 1)}>+</button>
                            </div>
                        </div>
                        <div className="total-price">{formatNumber(item.price * item.count)}</div>
                        <button className="remove-button" onClick={() => removeItem(item.productId)}>×</button>
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
