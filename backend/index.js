const express = require("express");
const path = require("path");

const app = express();
const port = 4000;

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all handler for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
