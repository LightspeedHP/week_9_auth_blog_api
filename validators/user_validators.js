const Joi = require("joi");

const createUserSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const validateNewUser = (req, res, next) => {
    const {error} = createUserSchema.validate(req.body)
    if (error){
        //return res.status(400).json({error: error.details[0].message});
        return res.status(400).json({error: error});
    }
    next();
}

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const validateUser = (req, res, next) => {
    const {error} = userLoginSchema.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message})
    }
    next();
}

module.exports = {validateNewUser, validateUser}