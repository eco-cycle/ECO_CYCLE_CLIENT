import React, { useState, useEffect } from 'react';
import ProductData from './ProductData';
import Point from '../../assets/Shop/Point.svg'; // Import the Point icon
import "../../styles/pages/Shop/ShopCart.scss";
import { useNavigate } from 'react-router-dom';
import { getCartIn } from '../../apis/shop/apis'; // Import the getCartIn function

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
                console.log("장바구니 데이터:",data.data);
                setCartItems(data.data); // Assuming data is an array of cart items
                setSelectedItems(data.map(item => item.productId)); // Select all items by default
            } catch (error) {
                console.error("Failed to fetch cart items", error);
                // Optionally handle the error
            }
        };

        fetchCartItems();
    }, []); // Empty dependency array to run once on mount

    // Fetch product details from ProductData based on product ID
    const getProductDetails = (productId) => ProductData.products.find(product => product.productId === productId);

    // Update the count of items in the cart
    const updatecount = (productId, amount) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, count: Math.max(item.count + amount, 1) } : item
            )
        );
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
                const product = getProductDetails(item.productId);
                const productPrice = Number(product.price); // Ensure the price is a number
                return total + (productPrice * item.count);
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
                            <div className="count-controls">
                                <button onClick={() => updatecount(item.id, -1)}>-</button>
                                <span>{item.count}</span>
                                <button onClick={() => updatecount(item.id, 1)}>+</button>
                            </div>
                        </div>
                        {/* Display the total price for this product, formatted with commas */}
                        <div className="total-price">{formatNumber(product.price * item.count)}</div>
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
