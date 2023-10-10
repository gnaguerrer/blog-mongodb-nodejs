const mongoose = require("mongoose");
const validator = require("validator");
const Article = require("../models/Articles");

const createArticle = (req, res) => {
  let data = req.body;
  try {
    let validTitle =
      data?.title &&
      !validator.isEmpty(data.title) &&
      validator.isLength(data.title, { min: 5, max: undefined });

    let validContent =
      data?.content &&
      !validator.isEmpty(data.content) &&
      validator.isLength(data.content, { min: 30, max: undefined });

    if (!validTitle) {
      return res.status(400).json({
        message: "Unable to create an article",
        error: "Title is invalid",
      });
    }
    if (!validContent) {
      return res.status(400).json({
        message: "Unable to create an article",
        error: "Content is invalid",
      });
    }

    const newArticle = new Article(data);

    newArticle.save();
    return res.status(200).json({
      message: "Article created",
      data: newArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Unable to create an article",
      data: null,
    });
  }
};

const getArticles = async (req, res) => {
  let articles = await Article.find({}).sort({ date: -1 });
  if (!articles) {
    return res.status(404).json({
      message: "No articles found",
      error: "Not found",
    });
  }

  return res.status(200).json({
    message: "Success",
    data: articles,
    count: articles.length,
  });
};

const getArticleById = async (req, res) => {
  try {
    if (req.params?.articleId.length) {
      const articleId = new mongoose.Types.ObjectId(req.params.articleId);
      let article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({
          message: "No article found",
          error: "Not found",
        });
      }
      return res.status(200).json({
        message: "Success",
        data: article,
      });
    } else {
      return res.status(400).json({
        message: "No articleId found",
        error: "Params missing",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "ArticleId not valid",
      error: "Params wrong",
    });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    if (req.params?.articleId.length) {
      const articleId = new mongoose.Types.ObjectId(req.params.articleId);
      let article = await Article.findOneAndDelete(articleId);
      if (!article) {
        return res.status(404).json({
          message: "No article found",
          error: "Not found",
        });
      }
      return res.status(200).json({
        message: "Article deleted successfully",
        data: article,
      });
    } else {
      return res.status(400).json({
        message: "No articleId found",
        error: "Params missing",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "ArticleId not valid",
      error: "Params wrong",
    });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticleById,
};
