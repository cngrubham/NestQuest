async function authMiddleware(req, res, next) {
  const db = req.app.get("db");
  const { userName } = req.cookies;
  console.log(userName);
  if (!userName) next();
  const user = await db.User.findOne({ userName });
  req.user = user;
  next();
}

module.exports = authMiddleware;
