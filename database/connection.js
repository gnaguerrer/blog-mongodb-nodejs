const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog");
    console.log("Connected succesfully to database");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect with database");
  }
};

module.exports = {
  connection,
};
