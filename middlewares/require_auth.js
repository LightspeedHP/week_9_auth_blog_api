const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");

const requireAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({error: "Access denied, no token"});
    };

    console.log(req.header);
    const token = authHeader.replace('Bearer', '');

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(payload.userId)
        if(!user){
            return res.status(404).json({message: "User does not exist"});
        }
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({error: "Invalid or expired token"});
    }
};

module.exports = requireAuth;