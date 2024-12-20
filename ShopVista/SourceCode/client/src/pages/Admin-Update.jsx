import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {

    const { authorizationToken } = useAuthContext();



    const [data,setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    console.log("data from the PARAMS:",params)

    useEffect(() => {
        getSingleUserData();
    }, []);

    //get single user data on button
    const getSingleUserData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
                method:"GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`Users Single Data: ${data}`);
            setData(data);

            // if(response.ok){
            //     getSingleUserData();
            // }
        } catch (error) {
            console.log(error);
        }

    };

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    //update the user 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
            if(response.ok) {
                
                console.log("User is Updated Successfully");
                toast.success("User Updated successfully");
            }else {
                console.log("User is not Updated",response);
                toast.error("User Not Updated!!")

            }

        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
            <h1>Update User Data</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    required
                    value={data.username}
                    onChange={handleInput}
                />{" "}
                <br />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    required
                    value={data.email}
                    onChange={handleInput}
                />{" "}
                <br />

                <label htmlFor="phone">Phone</label>
                <input
                    type="phone"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    required
                    value={data.phone}
                    onChange={handleInput}
                />{" "}
                <br />
               

                <button type="submit">Update</button>
            </form>

        </>
    )
};