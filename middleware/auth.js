async function authMiddleware(req, _res, next) {
  const db = req.app.get("db");
  const { userName } = req.cookies;
  if (userName) {
    const user = await db.User.findById(userName);
    req.user = user;
  }
  next();
}

module.exports = authMiddleware;
