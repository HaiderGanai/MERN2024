//now we can use environment variables any where in the file that's why we kept it at the very top
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');


// handling the CORS policy
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};


app.use(cors(corsOptions));

//to use json in our application, it is a middlewares, it parses any data incoming in request bodies
// must be written before routes so that it is applies to all the susequest routes
app.use(express.json());



// Mouting the Route, to use router in main express js app 
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// defining the admin route
app.use("/api/admin", adminRoute);


//to tell our expressjs application that we are doing error handling using "next(error)",
//Check error before establishing the connection, if there is any error than there will be no connection
app.use(errorMiddleware);


const PORT = 5000;

// start the server only if we have connection with the db otherwise, just exit the code
connectDB().then( () => {
    app.listen(PORT, () =>{
        console.log(`Server is running at port : ${PORT}`);
    });

});
