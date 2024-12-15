import { useState } from "react";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userdata, setUserData] = useState(true);

    const { user } = useAuthContext();

    if(userdata && user) {
        setContact({
            username: user.username,
            email: user.email,
        });

        setUserData(false);
    };
    // Handle input changes
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact); // Outputs the form data to the console

        try {
            const response = await fetch("http://localhost:5000/api/form/contact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact),
            });

            if(response.ok) {
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                toast.success("Message Sent successfully");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <h1>Contact Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    required
                    value={contact.username}
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
                    value={contact.email}
                    onChange={handleInput}
                />{" "}
                <br />

                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    id="message"
                    autoComplete="off"
                    required
                    value={contact.message}
                    onChange={handleInput}
                ></textarea>{" "}
                <br />

                <button type="submit">Submit</button>
            </form>

            <div style={{ marginTop: "20px" }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13271.821519355066!2d73.1722123238411!3d33.73596991683761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfc180bf8c3149%3A0xfce8071e61b2e505!2sBarakahu%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1733849436572!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </>
    );
};
