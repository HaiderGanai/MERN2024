import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";

export const Register = () => {

    
    const navigate = useNavigate();
    
    //context api to use localstorage to get jwt token
    const { storeTokenInLS } = useAuthContext();

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });


    //handling the input values

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    };

    //handling the form submission
     const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(user);
        console.log(user);

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            
            // console.log(response);

            const res_data = await response.json();
            console.log("response from server: ", res_data.message);

            if(response.ok){
                storeTokenInLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                toast.success("Registration Seccessfull!!")
                navigate("/login");
            }else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("register: ", error);
        }

     };

    return(
        <>
            <div className="registration-image">

                {/* registration form */}
                <h1>Registration Form</h1>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                name="username"
                placeholder="username" 
                id="username" 
                required autoComplete="off"
                value={user.username}
                onChange={handleInput} /> <br />

                <label htmlFor="email">Email</label>
                <input 
                type="email"
                placeholder="enter your email" 
                name="email" 
                id="email" 
                required autoComplete="off"
                value={user.email}
                onChange={handleInput}  /> <br />

                <label htmlFor="phone">Phone</label>
                <input 
                type="tel"
                placeholder="phone" 
                name="phone" 
                id="phone" 
                required autoComplete="off"
                value={user.phone}
                onChange={handleInput} /> <br />

                <label htmlFor="password">Password</label>
                <input 
                type="password"
                placeholder="password" 
                name="password" 
                id="password" 
                required autoComplete="off"
                value={user.password}
                onChange={handleInput} /> <br />

                <button type="submit">Register Now</button>

                </form>


            </div>
        </>
    )
};