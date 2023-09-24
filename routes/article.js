const express = require("express");
const router = express.Router();
const ArticleContoller = require("../controllers/articleController");

router.get("/test", ArticleContoller.test);

router.post("/create_article", ArticleContoller.createArticle);

module.exports = router;
