const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");

const PORT = 3900;
const app = express();

// Setup CORS
app.use(cors());

// Parse body to json
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server running at PORT", PORT);
});

connection();
