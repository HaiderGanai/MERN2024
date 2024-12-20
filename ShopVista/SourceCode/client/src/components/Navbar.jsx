import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import "./Navbar.css"

export const Navbar = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">ShopVista</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <li>
                      <NavLink to="/admin"> Admin </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/logout"> Logout </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
