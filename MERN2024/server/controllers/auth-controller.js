const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
//Home Logic
const home = async (req, res) => {
    try {
        res
    .status(200)
    .send("Welcome to world best MERN series using controllers");
        
    } catch (error) {
        console.log(error)
    }

};

//Registration Logic 

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

    
        const userExist = await User.findOne({ email });

        if(userExist) {
            return res.status(400).json ({ message: "Email already exists"});
        }

        //hash the password
        const userCreated = await User.create({ 
            username,
            email,
            phone,
            password,
         });

         // passing the jwt token and also converting _id into string because jwt is mostly represented in string
        return res.status(201).json({ msg: "registration successful",
         token: await userCreated.generateToken(),
        userId: userCreated._id.toString(), });
    } catch (error) {
        // res.status(500).send("Internal Server Error");
        next(error);
        
    }

};

// Login Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        console.log("Login return:", userExist);

        if(!userExist){
           return res.status(500).json({ message: "Invalid Credentials test" });
        }

        // const user = await bcrypt.compare(password, userExist.password);
        //now the logic has been sent to user-model so that password is checked there
        const user = await userExist.comparePassword(password);
        
        if(user){
            return res.status(200).json({ msg: "Login Successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(), });

        }else{
           return res.status(401).json({ message:"Invalid Email or Password"});
        }

    } catch (error) {
       return res.status(500).send("Internal Server Error");
    }
};

//User logic to send user data

    const user =async (req, res) => {
        try {
            const userData = req.user;
            console.log(userData);
            return res.status(200).json({ userData });
            
        } catch (error) {
            console.log(`error fromt the user route ${error}`);
        }
    }



module.exports = { home, register, login, user };