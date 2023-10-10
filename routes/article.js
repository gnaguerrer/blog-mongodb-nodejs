const express = require("express");
const router = express.Router();
const ArticleContoller = require("../controllers/articleController");

router.post("/article", ArticleContoller.createArticle);
router.get("/article", ArticleContoller.getArticles);
router.get("/article/:articleId", ArticleContoller.getArticleById);

module.exports = router;
