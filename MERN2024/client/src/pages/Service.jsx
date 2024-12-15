import { useAuthContext } from "../contexts/auth";

export const Service = () => {
    const { services } = useAuthContext();

    // Ensure `services` is defined and an array before mapping
    if (!services || !Array.isArray(services)) {
        return <p>No services available.</p>;
    }

    // Define inline styles
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
    };

    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        width: "300px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
    };

    const headingStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#333",
    };

    const descriptionStyle = {
        fontSize: "14px",
        marginBottom: "8px",
        color: "#555",
    };

    const priceStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#009688",
        marginBottom: "8px",
    };

    const providerStyle = {
        fontSize: "14px",
        color: "#777",
    };

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#333" }}>Services</h1>
            <div style={containerStyle}>
                {services.map((curElem, index) => {
                    const { price, description, provider, service } = curElem;
                    return (
                        <div key={index} style={cardStyle}>
                            <p style={headingStyle}>Service: {service}</p>
                            <p style={descriptionStyle}>{description}</p>
                            <p style={priceStyle}>Price: {price}</p>
                            <p style={providerStyle}>Provider: {provider}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
