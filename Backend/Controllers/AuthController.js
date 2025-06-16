const User = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/env");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name and Email already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    password: hashPassword,
    role,
  });

  await newUser.save();
  return res.status(201).json({
    success: true,
    message: "User register successfully",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;
  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invaild credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      _id: checkUser?._id,
      userName: checkUser?.userName,
      userEmail: checkUser?.userEmail,
      role: checkUser?.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser?._id,
        userName: checkUser?.userName,
        userEmail: checkUser?.userEmail,
        role: checkUser?.role,
      },
    },
  });
};

module.exports = { registerUser, loginUser };
