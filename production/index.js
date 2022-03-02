const express = require("express");

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.static("build"));
app.use(
  "/admin",
  createProxyMiddleware({
    target: "http://restapi:28881",
  })
);
const port = 3000;
app.listen(port, () => {
  console.log("app run on port 3000");
});
