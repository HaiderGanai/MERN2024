import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuthContext();

const [user, setUser] = useState({
    email: "",
    password: "",
});

//handling the input values
const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
        ...user,
        [name]: value,
    });
};

// handling the form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(user);
    console.log(user);

    try {
        const response = await fetch(URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),

    });
        console.log("login form:", response);
        const res_data = await response.json();
        if(response.ok){
            storeTokenInLS(res_data.token);
            console.log("response from server: ", res_data);
            // alert("Login Successful");
            setUser({email: "", password: ""});
            toast.success("Login Successfull!!")
            navigate("/");
        }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
        }catch (error) {
        console.log(error);
    }


};
    return(
        <>
            <div className="registration-image">

                {/* registration form */}
                <h1>Login Form</h1>
            
            <form onSubmit={handleSubmit}>
                

                <label htmlFor="email">Email</label>
                <input 
                type="email"
                placeholder="enter your email" 
                name="email" 
                id="email" 
                required autoComplete="off"
                value={user.email}
                onChange={handleInput}  /> <br />


                <label htmlFor="password">Password</label>
                <input 
                type="password"
                placeholder="password" 
                name="password" 
                id="password" 
                required autoComplete="off"
                value={user.password}
                onChange={handleInput} /> <br />

                <button type="submit">Login Now</button>

                </form>


            </div>
        </>
    )
};