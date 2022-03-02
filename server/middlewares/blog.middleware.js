function blog_provider(req, res, next) {
  if (req.user.role !== "blog_provider" && req.user.role !== "root") {
    return res.status(403).send({ error: "ACCESS DENIED: Forbidden" });
  }
  next();
}

module.exports = { blog_provider };
