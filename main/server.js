const express = require("express");
const result = require("./serverIp.js");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

const port = process.env.NODE_ENV == "production" ? 80 : 8080;
const ipAddress = result;
const httpAddress = `http://${ipAddress}`;

// app.use(
//   "/kucharka",
//   createProxyMiddleware({ target: `${httpAddress}:3000`, changeOrigin: true })
// );
// app.use(
//   "/python",
//   createProxyMiddleware({ target: `${httpAddress}:5000`, changeOrigin: true })
// );

app.listen(port, ipAddress, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running at ${httpAddress}:${port}/`);
});
