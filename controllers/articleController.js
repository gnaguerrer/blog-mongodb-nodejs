const validator = require("validator");
const Article = require("../models/Articles");

const test = (req, res) => {
  return res.status(200).json({
    message: "Testing",
  });
};

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

module.exports = {
  test,
  createArticle,
};

const data = {
  title: "title",
  content: "Content",
};
