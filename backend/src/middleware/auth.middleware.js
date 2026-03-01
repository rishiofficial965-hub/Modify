const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      message: "Token not provided",
    });

  const isTokenBlacklisted = await blackListModel.findOne({
    token,
  });

  if (isTokenBlacklisted)
    return res.status(401).json({
      message: "Invalid Token",
    }); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };
