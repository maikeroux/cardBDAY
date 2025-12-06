const express = require("express");
const path = require("path");
const app = express();

// Serve all static files in the project folder
app.use(express.static(__dirname));

// Route for index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Birthday app running on http://localhost:3000");
});
