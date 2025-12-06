const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the current folder
app.use(express.static(path.join(__dirname, "/")));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
