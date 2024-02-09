const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");
const salt = 10;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

// Sign Up

router.post("/signup", async (req, res, next) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    // const { email, password, first_name, last_name } = req.body

    // Check empty fields
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check Email already exists
    const userEmailAlreadyExists = await User.findOne({ email: email });

    if (userEmailAlreadyExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(newUser, { message: "User created" });
  } catch (error) {
    console.error(error);
  }
});

// Log In

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email }).select("password email");

    console.log("============", existingUser);

    if (!existingUser) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Check if password is correct
    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchingPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Create the token
    const token = jwt.sign({ _id: existingUser._id }, SECRET_TOKEN, {
      algorithm: "HS256",
      expiresIn: "365d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
});

// Verify Token

router.get("/verify", isAuthenticated, (req, res, next) => {
  return res.status(200).json(req.user);
});

module.exports = router;
