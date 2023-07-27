import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY);
    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(otherDetails);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send(user._doc);
    } else {
      const newUser = new User({ ...req.body, fromGoogle: true });
      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_TOKEN_KEY);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};