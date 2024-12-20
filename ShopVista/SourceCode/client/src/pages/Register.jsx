import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";
import registerImage from "../assets/resources/register.png";

export const Register = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuthContext();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("response from server: ", res_data.message);

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registration Successful!!");
        navigate("/login");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("register: ", error);
    }
  };

  return (
    <>
      <section className="section-register">
        <main>
          <div className="container grid grid-two-cols">
            {/* Registration Image */}
            <div className="registration-image reg-img">
              <img
                src={registerImage}
                alt="a nurse with a cute look"
                width="400"
                height="500"
              />
            </div>

            {/* Registration Form */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Enter your username"
                    required
                    autoComplete="off"
                  />
                </div>
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
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Enter your phone number"
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
                    placeholder="Create a password"
                    required
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
