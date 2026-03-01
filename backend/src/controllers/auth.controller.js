const userModel = require("../models/user.model");
const blackListModel = require("../models/blacklist.model");
async function registerUser(req, res) {
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
}

async function loginUser(req, res) {
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
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  return res.status(200).json({
    message: "fetched Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;
  res.clearCookies("token");
  await blackListModel.create({
    token,
  });
  res.status(200).json({
    message: "logout successfully",
  });
}

module.exports = { registerUser, loginUser, getMe, logoutUser };
