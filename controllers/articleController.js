const mongoose = require("mongoose");
const Article = require("../models/Article");
const utils = require("../utils/validateArticle");
const fs = require("fs");
const path = require("path");

const createArticle = (req, res) => {
  let data = req.body;
  try {
    const isValidArticle = utils.validateArticle(data);
    if (!isValidArticle) {
      return res.status(400).json({
        message: "Data is not valid",
        error: "Unable to create an article",
      });
    } else {
      const newArticle = new Article(data);
      newArticle.save();
      return res.status(200).json({
        message: "Article created",
        data: newArticle,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to create an article",
      error: error?.message,
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

const updateArticle = async (req, res) => {
  if (req.params?.articleId.length) {
    try {
      let updatedData = req.body;
      const isValidArticle = utils.validateArticle(updatedData);
      if (!isValidArticle) {
        return res.status(400).json({
          message: "Data is not valid",
          error: "Unable to create an article",
        });
      } else {
        const articleId = new mongoose.Types.ObjectId(req.params.articleId);
        let updatedArticle = await Article.findOneAndUpdate(
          articleId,
          updatedData,
          {
            new: true,
          }
        );
        if (!updatedArticle) {
          return res.status(404).json({
            message: "No article found",
            error: "Not found",
          });
        }
        return res.status(200).json({
          message: "Article updated successfully",
          data: updatedArticle,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Article data not valid",
        error: "Params wrong",
      });
    }
  } else {
    return res.status(400).json({
      message: "No articleId found",
      error: "Params missing",
    });
  }
};

const uplaodFile = async (req, res) => {
  let file = req.file.originalname;
  let splitted_file = file.split(".");
  let ext = splitted_file[1];
  if (ext !== "png" && ext != "jpg" && ext !== "jpeg" && ext !== "gif") {
    fs.unlink(req.file.path, () => {
      return res.status(400).json({
        message: "Extension not valid",
        error: "Image invalid",
      });
    });
  } else {
    const articleId = new mongoose.Types.ObjectId(req.params.articleId);
    let updatedArticle = await Article.findOneAndUpdate(
      articleId,
      { image: req.file.filename },
      {
        new: true,
      }
    );
    if (!updatedArticle) {
      return res.status(404).json({
        message: "No article found",
        error: "Not found",
      });
    }
    return res.status(200).json({
      message: "Article updated successfully",
      data: updatedArticle,
    });
  }
};

const getImage = (req, res) => {
  let file = req.params.file;
  let route = `./images/articles/${file}`;

  fs.stat(route, (error, success) => {
    if (success) {
      return res.sendFile(path.resolve(route));
    } else {
      return res.status(400).json({
        message: "Image doesn't exist",
        error: "Not found",
      });
    }
  });
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticleById,
  updateArticle,
  uplaodFile,
  getImage,
};
