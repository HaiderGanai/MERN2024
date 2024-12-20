import { useAuthContext } from "../contexts/auth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Service = () => {
    const {
        services,
        addToCart,
        removeFromCart,
        cartItems,
        totalPrice,
        handleCheckout,
    } = useAuthContext();
    const [isCartOpen, setIsCartOpen] = useState(false);

    if (!services || !Array.isArray(services)) {
        return <p>No services available.</p>;
    }

    const handleCheckoutClick = () => {
        handleCheckout();
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Hero Section for Products */}
            <section className="section-hero">
                <div className="container">
                    <div className="hero-content text-center">
                        <h1>Our Products</h1>
                        <p>
                            Discover our extensive collection of premium products.
                            From latest trends to timeless classics, find exactly what you're looking for.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="section-services">
                <div className="container">
                    <div className="card-container">
                        {services.map((curElem, index) => {
                            const { price, description, provider, service } = curElem;
                            const id = curElem.id || index;

                            return (
                                <div key={id} className="card">
                                    <div className="card-content">
                                        <h3 className="card-title">{service}</h3>
                                        <p className="card-description">{description}</p>
                                        <p className="card-price">${price}</p>
                                        <p className="card-provider">Brand: {provider}</p>
                                        <button 
                                            className="btn" 
                                            onClick={() => addToCart({ id, service, price })}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cart Button */}
                <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
                    Cart ({cartItems.length})
                </button>

                {/* Cart Modal */}
                {isCartOpen && (
                    <div className="cart-modal">
                        <h2>Your Cart</h2>
                        {cartItems.length === 0 ? (
                            <p>No items in cart</p>
                        ) : (
                            <ul className="cart-items">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="cart-item">
                                        <span className="item-details">
                                            {item.service} - ${item.price}
                                        </span>
                                        <button
                                            className="btn remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <hr />
                        <p className="cart-total">
                            Total: ${totalPrice ? totalPrice.toFixed(2) : "0.00"}
                        </p>

                        <button className="btn checkout-btn" onClick={handleCheckoutClick}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}

                <ToastContainer />
            </section>
        </>
    );
};
