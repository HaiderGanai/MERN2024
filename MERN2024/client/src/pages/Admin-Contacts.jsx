import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const { authorizationToken } = useAuthContext();
    const [contactData, setcontactData] = useState([]);

    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts",{
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            if(response.ok) {
                setcontactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //defining the funtion for deleting button
    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if(response.ok) {
                getContactsData();
                toast.success("Deleted Successfully!!");
            }
        } catch (error) {
            toast.error("Deleted Successfully!!");
        }
    }

    useEffect(() =>{
        getContactsData();
    }, []);
    return(
        <div style={{ width: '100%', padding: '20px' }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Messages</h1>
            <div style={{ display: 'grid', gap: '20px', width: '100%' }}>
                {contactData.map((curContactData, Index) => {
                    const { username, email, message, _id } = curContactData;
                    return (
                        <div 
                            key={Index} 
                            style={{
                                width: '100%',
                                padding: '20px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <p><strong>Username:</strong> {username}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Message:</strong> {message}</p>
                            <button 
                                onClick={() => deleteContactById(_id)}
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};