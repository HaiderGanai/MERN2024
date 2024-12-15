const User = require("../models/user-model");
const Contact = require("../models/contact-model");

//logic for fetching users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, {password:0});
        if(!users || users.length === 0){
            console.log(users);
            return res.status(404).json({message: "No users found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


//logic for fetching contacts
const getAllContacts = async(req, res, next) =>{
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        return res.status(200).json(contacts);
        if(!contacts || contacts.length === 0) {
            return res.status(404).json({message: "No contacts found"});
        }
    } catch (error) {
        next(error);
    }
};

//logic for deleting user
const deleteUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id});
        res.status(200).json({ message: "User Deleted Successfully."});
    } catch (error) {
        next(error);
    }
};

//logic for updating the user

const getUserById = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id}, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

//logic for updating the user
const updateUserById = async (req, res) =>{
try {
    const id = req.params.id;
    const updatadUserData = req.body;

    const updatedData = await User.updateOne({_id:id},{
        $set: updatadUserData,
    });
    return res.status(200).json(updatedData);
} catch (error) {
    next(error);
}
};

//logic for deleting contacts
const deleteContactById = async (req, res) =>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id});
        res.status(200).json({ message: "Contact Deleted Successfully."});
    } catch (error) {
        next(error);
    }
};


module.exports = { getAllUsers , getAllContacts, deleteUserById,getUserById, updateUserById, deleteContactById };