const express = require("express");
const router = express.Router();
const {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} = require("../controllers/article_controller");

const {
    validateArticleUpdate,
    validateArticleCreate
} = require("../validators/article_validators");

const requireAuth = require("../middlewares/require_auth");

const requireOwnership = require("../middlewares/require_ownership");

router.post('/articles', requireAuth, validateArticleCreate, postArticle);

router.get('/articles', requireAuth, getAllArticles);

router.get('/articles/:id', requireAuth, getArticleById);

router.put('/articles/:id', requireAuth, requireOwnership, validateArticleUpdate, updateArticle);

router.delete('/articles/:id', requireAuth, requireOwnership, deleteArticle);

module.exports = router;