import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";

export const About = () => {

     const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);

    useEffect(() =>{
        setUserData(user.username);
    }, [user]);

    return(
        <>
            <h2>Hi {userData ? userData : "Guest" }</h2>
            <h1>Abou Us</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Laudantium ut corrupti tempore sed quasi, <br />
                 provident quo magni laborum quibusdam iusto.</p>

                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Laudantium ut corrupti tempore sed quasi, <br />
                 provident quo magni laborum quibusdam iusto.</p>

                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Laudantium ut corrupti tempore sed quasi, <br />
                 provident quo magni laborum quibusdam iusto.</p>

            <button>Connect Now</button> <button>Learn More</button>

            
        
        </>
    )
};