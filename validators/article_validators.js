const Joi = require("joi")

const postArticleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required()
})

const validateArticleCreate = (req, res, next) => {
    const {error} = postArticleSchema.validate(req.body)
    if (error){
        res.status(400).json({error: error.details[0].message})
    }
    next()
}


const updateArticleSchema = Joi.object({
        title: Joi.string().min(5),
        content: Joi.string().min(20)
})

const validateArticleUpdate = (req, res, next) => {
    const {error} = updateArticleSchema.validate(req.body)
    if (error){
        res.status(400).json({error: error.details[0].message})
    }
    next()
}

module.exports = {validateArticleUpdate, validateArticleCreate}