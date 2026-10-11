const Joi = require("joi");

const createUserSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const validateNewUser = (req, res, next) => {
    error = createUserSchema.validate(req.body)
    if (error){
        return res.status(400).json({error: error.details[0].message})
    }
}

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const validateUser = (req, res, next) => {
    error = createLoginSchema.validate(req.body)
    if (error){
        return res.status(400).json({error: error.details[0].message})
    }
}

module.exports = {validateNewUser, validateUser}