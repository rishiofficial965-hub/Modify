const userModel = require("../models/user.model");
const redis = require("../config/cache");
const blackListModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered)
      return res.status(400).json({
        message: "User Already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "Registered Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error during registration", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserExists = await userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!isUserExists)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const isValidPass = await bcrypt.compare(password, isUserExists.password);

    if (!isValidPass)
      return res.status(400).json({
        message: "Invalid Password",
      });

    const token = jwt.sign(
      {
        id: isUserExists._id,
        username: isUserExists.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "login Successfully",
      user: {
        id: isUserExists._id,
        username: isUserExists.username,
        email: isUserExists.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login", error: error.message });
  }
}

async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "fetched Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Internal server error during fetch", error: error.message });
  }
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;
    res.clearCookie("token");

    if (token) {
      await redis.set(token, Date.now().toString(), "EX", 24 * 60 * 60);
    }

    res.status(200).json({
      message: "logout successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error during logout", error: error.message });
  }
}

module.exports = { registerUser, loginUser, getMe, logoutUser };
