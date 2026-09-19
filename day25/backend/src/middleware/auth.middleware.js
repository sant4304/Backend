const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is not provided" });
  }

  const isTokenBlacklisted = await blacklistModel.findOne({
    token:token
  })
   
  if(isTokenBlacklisted){
            return res.status(401).json({
                message: "Token has been blacklisted"
            });
        }
  let decoded = null;

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

module.exports = {authUser};
