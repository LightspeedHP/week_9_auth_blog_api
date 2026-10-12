const ArticleModel = require("../models/article_model")

const postArticle = async(req, res, next) => {
    try {
        const newArticle = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        });
        await newArticle.save();
        res.status(201).json({
            message: "Article created",
            data: newArticle
        })
    } catch (error) {
        next(error)
    }
}

const getAllArticles = async(req, res, next) => {
    const {limit = 10, page = 1, search} = req.query;
    const skip = parseInt(page - 1) * limit;

    let query = {};
    if (search){
        query = {
            $or: [
                {title: {$regex: search, $options: 'i'}},
                {content: {$regex: search, $options: 'i'}}
            ]
        }
    }

    try {
        const articles = await ArticleModel.find(query)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .populate("author", "name, _id, email")
        const totalArticles = await ArticleModel.countDocuments(query)
        res.status(200).json({
            data: articles,
            meta: {
                page: parseInt(page),
                limit: limit,
                total: totalArticles
            }
        })
    } catch (error) {
        next(error)
    }
}

const getArticleById = async(req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);
        if(!article){
            res.status(404).json({message: "Article not found"})
        }
        res.status(200).json({
            message: "Article found",
            data: article
        })
    } catch (error) {
        next(error)
    }
}

const updateArticle = async(req, res, next) => {
    try {
        const update = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!update){
            res.status(404).json({message: "Article not found"})
        }
        res.status(200).json({
            message: "Article updated",
            data: update
        })
    } catch (error) {
        next(error)
    }
}

const deleteArticle = async(req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);
        if(!article){
            res.status(404).json({message: "Article not found"});
        }

        res.status(200).json({message: "Article deleted"});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
}