const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");
const routeArticle = require("./routes/article");

require("dotenv").config();

console.log(process.env.PORT);

connection();

const PORT = process.env.PORT || 3900;
const app = express();

// Setup CORS
app.use(cors());
// Parse body to json
app.use(express.json());

app.use("/api", routeArticle);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Success",
  });
});

app.listen(PORT, () => {
  console.log("Server running at PORT", PORT);
});
