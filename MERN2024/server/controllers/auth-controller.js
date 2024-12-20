const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/email-service.js");

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
    };

    // Forgot Password Logic
    const forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
        
            console.log("Email received for forgot password:", email);
        
            const user = await User.findOne({ email: email.trim().toLowerCase() });
        
            if (!user) {
                return res.status(404).json({ message: "Email not found" });
            }
        
            try {
                // Generate a reset token
                const resetToken = await user.generateResetToken();
                
                // Save the token to the user document
                user.resetToken = resetToken;
                user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
                await user.save();
            
                const resetLink = `${process.env.FRONTEND_URL.replace(/;$/, '')}/reset-password/${resetToken}`;
            
                console.log("Reset link generated:", resetLink);
            
                // Send the email
                await sendEmail({
                    to: user.email,
                    subject: "Password Reset Request",
                    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                           <a href="${resetLink}">${resetLink}</a>
                           <p>This link will expire in 1 hour.</p>`
                });
            
                return res.status(200).json({ message: "Password reset link sent to your email." });
            } catch (error) {
                console.error("Error during password reset:", error);
                return res.status(500).json({ message: "Failed to process password reset" });
            }
        
        } catch (error) {
            console.error("Error in forgotPassword:", error);
            return res.status(500).json({ message: "Error processing request", error: error.message });
        }
    };
      

// Reset Password Logic
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Set new password
        user.password = password; // The pre-save hook will hash it
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




module.exports = { home, register, login, user, forgotPassword, resetPassword };