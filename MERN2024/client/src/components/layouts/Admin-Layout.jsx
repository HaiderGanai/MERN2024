import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuthContext } from "../../contexts/auth";
import './adminLayout.css'; // Ensure this file is imported


export const AdminLayout = () => {
    const { isLoading, isAdmin } = useAuthContext();
  
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    
  
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
  
    return (
      <div className="admin-layout">
        {/* Sidebar */}
        <nav className="sidebar">
          <ul className="nav-list">
            <li>
              <NavLink to="/admin/users" className={({isActive}) => isActive ? "active" : ""}>
                <FaUser /> <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contacts" className={({isActive}) => isActive ? "active" : ""}>
                <FaMessage /> <span>Contacts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/admin-services" className={({isActive}) => isActive ? "active" : ""}>
                <FaRegListAlt /> <span>Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/admin-home" className={({isActive}) => isActive ? "active" : ""}>
                <FaHome /> <span>Home</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    );
};
