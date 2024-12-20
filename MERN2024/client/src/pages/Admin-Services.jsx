import { useAuthContext } from "../contexts/auth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

export const AdminServices = () => {
    const {
        services,
        addToCart,
        removeFromCart,
        cartItems,
        totalPrice,
        handleCheckout,
        authorizationToken
    } = useAuthContext();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const params = useParams();

    if (!services || !Array.isArray(services)) {
        return <p>No services available.</p>;
    }

    const handleCheckoutClick = () => {
        handleCheckout();
        setIsCartOpen(false);
    };

    //delete the service logic
    const deleteServiceById = async (id) => {
        try {
            // const id = req.params.id;
        const response = await fetch(`http://localhost:5000/api/admin/services/delete/${id}`,{
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
            }
        });
        const data = await response.json();
        console.log(`services after deletion: ${data}`);

        if(response.ok){
            deleteServiceById();
            toast.success("Service deleted successfully");
        }
        } catch (error) {
            console.log(error);
            toast.error("Error deleting service");
        }
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
                                        <button className="btn"> <Link to={`/admin/admin-services/${curElem._id}/edit` }
                                         style={{ textDecoration: 'none', color: 'inherit' }} >Edit</Link></button>
                                        <button 
                                            className="btn" 
                                            onClick={() => addToCart({ id, service, price })}
                                        >
                                            Add to Cart
                                        </button>
                                        <button onClick={() => deleteServiceById(curElem._id)} style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>delete</button>
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
