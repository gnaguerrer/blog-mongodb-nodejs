const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected succesfully to database");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect with database");
  }
};

module.exports = {
  connection,
};
