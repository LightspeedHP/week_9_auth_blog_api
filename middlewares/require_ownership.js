const ArticleModel = require("../models/article_model");

const requireOwnership =  async(req, res, next) => {
    try {
        const item = await ArticleModel.findById(req.params.id);
        if(!item){
            return res.status(404).json({error: "Not found"})
        }
        if(item.author.toString() !== req.user._id){
            return res.status(401).json({error: "Forbidden"});
        }
    } catch (error) {
        next(error)
    }
};

module.exports = requireOwnership;