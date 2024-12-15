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
        <>
        {contactData.map((curContactData, Index) => {
            const { username, email, message, _id } = curContactData;
            return <div key={Index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button onClick={() => deleteContactById(_id)}>delete</button>
            </div>
        })}

        </>
    )
};