const express = require("express");
const router = express.Router();
const ArticleContoller = require("../controllers/articleController");

router.post("/article", ArticleContoller.createArticle);
router.get("/article", ArticleContoller.getArticles);

module.exports = router;
