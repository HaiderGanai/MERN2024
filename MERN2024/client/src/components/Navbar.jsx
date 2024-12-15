import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
export const Navbar = () => {

    const {isLoggedIn} = useAuthContext();

    return(
    <>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/">Thapa technical</NavLink>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/service">Services</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            
                            {isLoggedIn ? 
                            
                                    <li><NavLink to="/logout">Logout</NavLink></li> : 
                                <>
                                    <li><NavLink to="/register">Registration</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                </>
                            }
                            
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    
    </>
)};