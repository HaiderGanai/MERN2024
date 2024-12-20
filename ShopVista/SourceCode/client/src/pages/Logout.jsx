import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";

export const Logout = () => {

    const { LogoutUser } = useAuthContext();
    
    useEffect(() =>{
        LogoutUser();
    }, [LogoutUser]);

    return <Navigate to="/login" /> ;
};