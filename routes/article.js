const express = require("express");
const router = express.Router();
const ArticleContoller = require("../controllers/articleController");

router.post("/article", ArticleContoller.createArticle);

router.get("/article", ArticleContoller.getArticles);

router.get("/article/:articleId", ArticleContoller.getArticleById);
router.delete("/article/:articleId", ArticleContoller.deleteArticleById);

module.exports = router;
