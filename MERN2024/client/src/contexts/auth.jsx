import { createContext, useContext, useEffect, useState } from "react";


// 1. create authContext
export const AuthContext = createContext();

// 2. Define the authProvider
export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const[services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

        //handling the login/logout toggle
        let isLoggedIn = !!token;
        console.log("is user logged in?", isLoggedIn);

    // handling the logout functionality
    const LogoutUser = () => {
        setToken(null);
        return localStorage.removeItem("token");
    };

    //AUTHENICATION- to get the currently loggedIN user data

    const userAuthentication = async() =>{
        try {
            setisLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if(response.ok) {
                const data = await response.json();
                console.log("user data: ", data.userData);
                setUser(data.userData);
                setisLoading(false);
            }else {
                console.log("Error fetching User data");
                setisLoading(false);
            }
        } catch (error) {
            console.log("Error fetching User data")
        }
    };

    //to fetch the services data from the database
    const getServices = async () =>{
        try {
            const response = await fetch("http://localhost:5000/api/data/service",{
                method: "GET"
            });
            if(response.ok) {
                const data = await response.json();
                console.log("data from the services:", data.msg);
                setServices(data.msg);
            }
            
        } catch (error) {
            console.log(`service frontend error: ${error}`);
        }
    }

    useEffect(() =>{
        getServices();
        userAuthentication();
    }, []);

    // Passing the function so that is can be accessabale to everyone
    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading}}>
        { children }
    </AuthContext.Provider>
};


export const useAuthContext = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error("useAuth is used outside of the provider");
    }
    
    return authContextValue;
};