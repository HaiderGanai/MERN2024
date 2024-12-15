import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuthContext } from "../../contexts/auth";

 export const AdminLayout = () => {

    const { user, isLoading } = useAuthContext();

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(!user.isAdmin){
        return <Navigate to="/" />
    }

   return (
    <>
    <header>
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/admin/users"><FaUser />users</NavLink></li>
                    <li><NavLink to="/admin/contacts"><FaMessage />contacts</NavLink></li>
                    <li><NavLink to="/service"><FaRegListAlt />services</NavLink></li>
                    <li><NavLink to="/"><FaHome />Home</NavLink></li>
                </ul>
            </nav>
        </div>
        </header>
        <Outlet />
    </>
)
 };