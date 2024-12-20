import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";
import loginImage from "../assets/resources/login.png";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuthContext();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handling the input values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login Successful!");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <section className="section-login">
        <main>
          <div className="container grid grid-two-cols">
            {/* Login Image */}
            <div className="login-image reg-img">
              <img
                src={loginImage}
                alt="a nurse with a cute look"
                width="400"
                height="500"
              />
            </div>

            {/* Login Form */}
            <div className="login-form">
              <h1 className="main-heading mb-3">Login Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter your password"
                    required
                    autoComplete="off"
                  />
                </div>
                <br />
                <div className="forgot-password-container">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="forgot-password-btn"
                  >
                    Forgot Password?
                  </button>
                </div>
                <br />
                <button type="submit" className="btn-submit">
                  Login Now
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
