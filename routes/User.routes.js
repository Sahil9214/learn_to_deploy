const express = require("express");
const userRouter = express.Router();
const UserModel = require("../backend/model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  //logic
  const { email, pass, age, name } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = UserModel({ email, pass: hash, age, name });
      await user.save();
      console.log(user);
      res.status(200).send({ msg: "Register successfull" });
    });
  } catch (err) {
    res.status(400).json({ msg: "New User cannot has been register" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  console.log("req", req.body);
  try {
    const user = await UserModel.findOne({ email, pass });
    if (user) {
      bcrypt.compare(pass, user.pass, async (err, result) => {
        if (result === true) {
          const token = jwt.sign({ authorID:user._id,author:user.name}, "masai");
          res.status(200).json({ msg: "you success login", token: token });
        } else {
          res.status(200).end({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(200).end({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Wrong Credentials!!!" });
  }
});
module.exports = userRouter;
