const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users=await UserModel.find(req.query);
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({"err":err.message});
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
      const user=await UserModel.findOne({_id:req.params.id})
      res.status(200).send(user);
  } catch (err) {
      res.status(400).send({"err":err.message});
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password} = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({"err":err})
      } else {
        const existing = await UserModel.findOne({ email: email });
        if (existing) {
          res.status(200).send({ "msg": "User already exist" });
        } else {
          let user = new UserModel({
            name,
            email,
            gender,
            password: hash,
          });
          await user.save();
          res.status(200).send({ "msg": "Registered Successfully"});
        }
      }
    });
  } catch (err) {
    res.status(400).send({"err":err.message});
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id, user:user.name }, process.env.key);
          res.status(200).send({
            "msg": `Login Successfull`,
            "token": token,
          });
        } else {
          res.status(200).send({ "msg": "Wrong Password" });
        }
      });
    } else {
      res.status(200).send({ "msg": `${email} does not exist.` });
    }
  } catch (err) {
    res.status(400).send({ "err": err.message });
  }
});

module.exports = userRouter;