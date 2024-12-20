import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/reset-password";

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`${URL}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successful!");
                navigate("/login");
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
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};