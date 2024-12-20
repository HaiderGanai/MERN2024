import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { toast } from "react-toastify";

export const AdminServicesUpdate = () => {

    const [data, setData] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
    });

    const params = useParams();
    const {authorizationToken} = useAuthContext();

    //get single service data
    const getSingleServiceData = async(id) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/services/${params.id}`,{
                method: "GET",
                headers: {
                    Authorization : authorizationToken
                }
            });
            const responseData = await response.json();
            console.log(`service single data: ${data}`);
            console.log("Data od the Services:",data)
            setData(responseData.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() =>{
        getSingleServiceData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })
    };

    //to update the service
const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:5000/api/admin/services/update/${params.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : authorizationToken
            },
            body:JSON.stringify(data),
        });
        if(response.ok) {

            toast.success("Service Updated Successfully!!");
        }else{
            toast.error("Service NOT Updated!!");
        }
    } catch (error) {
        console.log(error);
    }
}
    return(
        <>
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="card-title">Card Title</label>
                    <input 
                    type="text"
                    name="service"
                    id="cardTitle"
                    autoComplete="off"
                    value={data.service}
                    onChange={handleInput}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="card-description">Card description</label>
                    <input 
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="off"
                    value={data.description}
                    onChange={handleInput}
                    required
                    style={{ width: '50%' }}
                    />
                </div>
                <div>
                    <label htmlFor="card-price">Card price</label>
                    <input 
                    type="number"
                    name="price"
                    id="price"
                    autoComplete="off"
                    value={data.price}
                    onChange={handleInput}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="card-provider">Card provider</label>
                    <input 
                    type="text"
                    name="provider"
                    id="provider"
                    autoComplete="off"
                    value={data.provider}
                    onChange={handleInput}
                    required
                    />
                </div>
                <button type="submit">Updated</button>
            </form>

        </>
    )
}