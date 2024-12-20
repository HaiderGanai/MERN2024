import { FaUser, FaEnvelope, FaTools, FaChartLine } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/auth';
import "./Admin-Home.css"


export const AdminHome = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalContacts: 0,
        totalServices: 0
    });
    const { authorizationToken } = useAuthContext();

    // Fetch all stats
    const fetchStats = async () => {
        try {
            // Fetch users
            const usersResponse = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const usersData = await usersResponse.json();
            const totalUsers = Array.isArray(usersData) ? usersData.length : 0;

            // Fetch contacts
            const contactsResponse = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const contactsData = await contactsResponse.json();
            const totalContacts = Array.isArray(contactsData) ? contactsData.length : 0;

            // Fetch services
            const servicesResponse = await fetch("http://localhost:5000/api/data/service", {
                method: "GET"
            });
            const servicesData = await servicesResponse.json();
            const totalServices = Array.isArray(servicesData.msg) ? servicesData.msg.length : 0;

            // Update all stats
            setStats({
                totalUsers,
                totalContacts,
                totalServices
            });

        } catch (error) {
            console.log("Error fetching stats:", error);
            setStats({
                totalUsers: 0,
                totalContacts: 0,
                totalServices: 0
            });
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="admin-home">
            <h1>Welcome to Admin Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="stats-container">
                <div className="stat-card">
                    <FaUser className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Users</h3>
                        <p>{stats.totalUsers}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaEnvelope className="stat-icon" />
                    <div className="stat-info">
                        <h3>Contact Messages</h3>
                        <p>{stats.totalContacts}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaTools className="stat-icon" />
                    <div className="stat-info">
                        <h3>Services</h3>
                        <p>{stats.totalServices}</p>
                    </div>
                </div>
            </div>

            {/* Quick Guide Section */}
            <div className="quick-guide">
                <h2>Admin Quick Guide</h2>
                <div className="guide-cards">
                    <div className="guide-card">
                        <h3>User Management</h3>
                        <ul>
                            <li>View all registered users</li>
                            <li>Edit user details</li>
                            <li>Delete user accounts</li>
                            <li>Monitor user activities</li>
                        </ul>
                    </div>
                    <div className="guide-card">
                        <h3>Contact Messages</h3>
                        <ul>
                            <li>View user inquiries</li>
                            <li>Delete resolved messages</li>
                            <li>Track communication history</li>
                            <li>Manage user feedback</li>
                        </ul>
                    </div>
                    <div className="guide-card">
                        <h3>Services Management</h3>
                        <ul>
                            <li>Add new services</li>
                            <li>Update service details</li>
                            <li>Remove outdated services</li>
                            <li>Manage service categories</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Important Notes */}
            <div className="important-notes">
                <h2>Important Notes</h2>
                <ul>
                    <li>Always verify user information before making changes</li>
                    <li>Regularly backup important data</li>
                    <li>Keep service information up to date</li>
                    <li>Respond to contact messages promptly</li>
                </ul>
            </div>
        </div>
    );
};