import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuthContext();

  const getAllUsersData = async () => {
    const response = await fetch("http://localhost:5000/api/admin/users", {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });
    const data = await response.json();
    console.log(`Users for admin: ${data}`);
    setUsers(data);
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  // Delete user on delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Users After Delete Operation: ${data}`);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableStyle = {
    width: "100%", /* Make the table take the full width of the content area */
    margin: "20px auto",
    borderCollapse: "collapse",
    textAlign: "left",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Users</h1>
      {users.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{curUser.username}</td>
                <td style={thTdStyle}>{curUser.email}</td>
                <td style={thTdStyle}>{curUser.phone}</td>
                <td style={thTdStyle}>
                  <button style={{ marginRight: "10px" }}>
                    <Link to={`/admin/users/${curUser._id}/edit`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>Edit</Link>
                  </button>
                  <button onClick={() => deleteUser(curUser._id)}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>No users found.</p>
      )}
    </div>
  );
};
