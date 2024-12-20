const adminMiddleware =async (req, res, next) =>{
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({ message: "Access denied. User is not ad ADMIN!!"})
        }
        else{
            //if user is an admin onlt then proceed to next
            next();
        }
        // res.status(200).json({msg: req.user.isAdmin});
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;