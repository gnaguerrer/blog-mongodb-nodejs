const express = require("express");
const multer = require("multer");
const router = express.Router();
const ArticleContoller = require("../controllers/articleController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/articles/");
  },
  filename: (req, file, cb) => {
    cb(null, `article_${Date.now()}_${file.originalname}`);
  },
});

const uploadedImages = multer({ storage });

router.post("/article", ArticleContoller.createArticle);
router.get("/article", ArticleContoller.getArticles);
router.get("/article/:articleId", ArticleContoller.getArticleById);
router.delete("/article/:articleId", ArticleContoller.deleteArticleById);
router.put("/article/:articleId", ArticleContoller.updateArticle);
router.post(
  "/article_image/:articleId",
  [uploadedImages.single("file")],
  ArticleContoller.uplaodFile
);

module.exports = router;
