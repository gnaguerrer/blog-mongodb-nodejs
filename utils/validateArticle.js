const validator = require("validator");

const validateArticle = (data) => {
  let validTitle =
    data?.title &&
    !validator.isEmpty(data.title) &&
    validator.isLength(data.title, { min: 5, max: undefined });

  let validContent =
    data?.content &&
    !validator.isEmpty(data.content) &&
    validator.isLength(data.content, { min: 30, max: undefined });

  if (!validTitle || !validContent) {
    throw new Error("Validation fails");
  } else {
    return true;
  }
};

module.exports = {
  validateArticle,
};
