import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Toast container for notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

// 1. Create authContext
export const AuthContext = createContext();

// 2. Define the authProvider
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const [services, setServices] = useState("");
    const [cartItems, setCartItems] = useState([]); // Cart items state
    const [admin, setAdmin] = useState(localStorage.getItem("isAdmin") === 'true');
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        setAdmin(isAdmin);
        localStorage.setItem("token", serverToken);
        localStorage.setItem("isAdmin", isAdmin); // Store the admin status as well
    };

    // Handling the login/logout toggle
    let isLoggedIn = !!token;
    console.log("is user logged in?", isLoggedIn);

    // check if the user is an Admin
    const isAdmin = user.isAdmin || false;
    console.log("the status of user role:", isAdmin);

    // Handling the logout functionality
    const LogoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
    };

    // AUTHENICATION - to get the currently logged-in user data
    const userAuthentication = async () => {
        try {
            setisLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("user data: ", data.userData);
                setUser(data.userData);
                setisLoading(false);
            } else {
                console.log("Error fetching User data");
                setisLoading(false);
            }
        } catch (error) {
            console.log("Error fetching User data");
        }
    };

    // To fetch the services data from the database
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log("data from the services:", data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`service frontend error: ${error}`);
        }
    };

    //Add to cart function
    const addToCart = (item) => {
        const extractAveragePrice = (priceRange) => {
            const numbers = priceRange
                .replace(/\$/g, "") // Remove dollar signs
                .replace(/,/g, "") // Remove commas
                .split("-") // Split the range
                .map((num) => parseFloat(num.trim())); // Convert to numbers
    
            if (numbers.length === 2) {
                return (numbers[0] + numbers[1]) / 2; // Calculate average
            } else if (numbers.length === 1) {
                return numbers[0]; // Single number case
            }
            return NaN; // Invalid price format
        };
    
        const parsedPrice = extractAveragePrice(item.price);
        if (!isNaN(parsedPrice)) {
            setCartItems((prev) => [...prev, { ...item, price: parsedPrice }]);
        } else {
            console.error("Invalid price value:", item.price);
        }
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

     // Calculate total price
const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0) || 0; // Default to 0 if empty 

     // Checkout functionality
     const handleCheckout = () => {
         if (cartItems.length === 0) {
             toast.error("Your cart is empty. Add some items before checking out!");
             return;
         }
 
         // Show toast message with the total price
         toast.success(`Checkout completed! Total: $${totalPrice.toFixed(2)}`);
         setCartItems([]); // Clear cart after checkout
     };

    useEffect(() => {
        getServices();
        userAuthentication();
    }, [token]);

    // Passing the function so that it can be accessible to everyone
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                storeTokenInLS,
                LogoutUser,
                user,
                services,
                authorizationToken,
                isLoading,
                cartItems,
                addToCart,
                removeFromCart,
                handleCheckout,
                totalPrice,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth is used outside of the provider");
    }

    return authContextValue;
};
