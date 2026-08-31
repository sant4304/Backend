const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not provided ,Unauthorized access",
    });
  }
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRATE);
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized access",
    });
  }

  req.user = decoded

  next()
}


module.exports =identifyUser