import { useState } from "react";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/forgot-password";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset link sent to your email!");
                setEmail("");
            } else {
                toast.error(data.extraDetails ? data.extraDetails : data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="registration-image">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};