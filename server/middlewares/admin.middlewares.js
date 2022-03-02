function admin(req, res, next) {
  if (req.user.role !== "root")
    return res.status(403).send({ error: "ACCESS DENIED: Forbidden" });
  next();
}

module.exports = { admin };
