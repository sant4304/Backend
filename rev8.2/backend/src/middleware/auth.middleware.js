const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklist.model");
const redis = require("../config/cache");

async function idetifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is not provided" });
  }

  let decoded = null;

  // const isTokenBlacklisted = await blacklistModel.findOne({
  //   token,
  // });

  const isTokenBlacklisted = await redis.get(token)
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Token has been blacklisted",
    });
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = idetifyUser;
