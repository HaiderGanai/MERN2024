const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    }
});

//secure password with bcrypt js using pre method, 'save' here means before saving the data in db, this function will run, it is a middleware
userSchema.pre('save', async function(next) {
    console.log("Pre-save middleware running");
    const user = this;

    if(!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
        next();
    } catch (error) {
        return next(error);
    }
});

// compare password using bcryptjs for login
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
};

// JSON web token, these are typically not stored in the database, it is stored on client side in the browser in the form of cookies or local storage
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        }
    );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Method to generate a reset token
userSchema.methods.generateResetToken = async function () {
    try {
        // Generate a reset token
        const resetToken = jwt.sign(
            { userId: this._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
        return resetToken;
    } catch (error) {
        throw new Error("Failed to generate reset token");
    }
};

//define the model or the collection name that will be stored in mongoo

const User = new mongoose.model("User", userSchema);

module.exports = User;