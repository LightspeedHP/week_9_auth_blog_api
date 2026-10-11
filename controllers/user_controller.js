const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");

const registerUser = async(req, res, next) => {
    try {
        const {email, password, name} = req.body;
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);

        const existingUser = await UserModel.findOne({email: email});
        if(!existingUser){
            return res.status(400).json({message: "User already exist"});
        }

        const user = new UserModel({
            email: email,
            password: hashed,
            name: name
        }) ;

        await user.save();
        return res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email: email});
        if(!user){
            return res.status(404).json({message: "User does not exist"});
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign(
            {userId: user._id, name: user.name},
            process.env.JWT_SECRET,
            {expiredIn: '7d'}
        );

        const resUser = {
            _id: user.id,
            email: user.email,
            name: user.name
        }

        return res.status(200).json({message: "User logged in", user: resUser, token})
    } catch (error) {
        next(error);
    }
};

module.exports = {registerUser, loginUser};