const userModel = require("../models/User");
const { validationResult } = require("express-validator");

module.exports = {
  async register(req, res) {
    try {
      const { password, email, name, phone } = req.body;
      // const pwdRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
      // const pattern = new RegExp(pwdRegex);
      const errors = validationResult(req);
      console.log("errors", errors.array());
      if (!errors.isEmpty()) {
        return res.status(403).send({
          errors: errors.array(),
        });
      }
      const newUser = new userModel({ ...req.body });
      await newUser.generateToken();
      // console.log("new user token",newUser.token);
      const user = await newUser.save();
      return res.status(200).send({
        status: "success",
        msg: "user registerd sucessfully",
        token: user.token,
      });
    } catch (err) {
      // console.log(err);
      if (err.message.includes("phone")) {
        return res.send({ msg: "please provide unique phone no" });
      } else if (err.message.includes("email")) {
        return res.send({ msg: "please provide unique email id" });
      }
    }
  },

  async getAllUsers(req, res) {
    try {
      const allUsers = await userModel.find(
        { createdBy: req.user.id },
        { name: 1, email: 1, phone: 1, _id: 1 }
      );
      return res.status(201).send({
        status: "success",
        users: allUsers,
      });
    } catch (err) {
      return res.status(500).send({
        status: "fail",
        msg: err.message,
      });
    }
  },

  async login(req, res) {
    const { password, email } = req.body;
    if (!password || !email)
      return res.status(404).send({ msg: "Pls give email and password" });
    try {
      const errors = validationResult(req);
      console.log("errors", errors.array());
      if (!errors.isEmpty()) {
        return res.status(403).send({
          errors: errors.array(),
        });
      }
      const user = await userModel.findByEmailAndPassword(email, password);
      // console.log('users', user);
      user[0].generateToken();
      await user[0].save({ validateBeforeSave: false });

      return res.status(200).send({
        status: "success",
        msg: `Welcome ${user[0].name}`,
        token: user[0].token,
      });
    } catch (err) {
      return res.status(404).send({ msg: err });
    }
  },

  async logout(req, res) {
    try {
      const currentUser = req.user.id;
      const user = await userModel.findOne({ _id: currentUser });
      if (user) {
        user.token = null;
        // user.refreshToken = null;
        await user.save({ validateBeforeSave: false });
        return res
          .status(200)
          .send({ status: "success", msg: "Thank you visit again" });
      } else {
        throw Error("Please Login first");
      }
    } catch (err) {}
  },
  async createNewUser(req, res) {
    try {
      const { password, email, name, phone } = req.body;
      // const pwdRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
      // const pattern = new RegExp(pwdRegex);
      const errors = validationResult(req);
      console.log("errors", errors.array());
      if (!errors.isEmpty()) {
        return res.status(403).send({
          errors: errors.array(),
        });
      }
      const newUser = new userModel({ ...req.body, createdBy: req.user.id });
      // await newUser.generateToken();
      // console.log("new user token",newUser.token);
      const user = await newUser.save();
      return res.status(200).send({
        status: "success",
        msg: "user created sucessfully",
        // token: user.token,
      });
    } catch (err) {
      console.log(err);
      if (err.message.includes("phone")) {
        return res.status(403).send({ msg: "please provide unique phone no" });
      } else if (err.message.includes("email")) {
        return res.status(403).send({ msg: "please provide unique email id" });
      }
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      console.log("errors", errors.array());
      if (!errors.isEmpty()) {
        return res.status(403).send({
          errors: errors.array(),
        });
      }
      const user = await userModel
        .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        .select("-password");
      console.log(user);
      return res.status(201).send({
        status: "success",
        user: user,
      });
    } catch (err) {
      return res.status(500).send({
        status: "fail",
        msg: err.message,
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      console.log("id", id);
      const result = await userModel.findOneAndDelete({ _id: id });
      console.log("result", result);
      if (!Object.keys(result).length) {
        return res.status(404).send({
          status: "fail",
          msg: "user not found",
        });
      }
      const users = await userModel.find({ createdBy: req.user.id });
      console.log("users ", users);
      return res.status(201).send({
        status: "success",
        msg: "user deleted sucessfully",
        users,
      });
    } catch (err) {
      return res.status(500).send({
        status: "fail",
        msg: err.message,
      });
    }
  },

  async getSingleUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findOne({ _id: id });
      if (!Object.keys(user).length) {
        return res.status(404).send({
          status: "fail",
          msg: "no user is found",
        });
      }
      return res.status(200).send({
        status: "success",
        user,
      });
    } catch (err) {
      return res.status(500).send({
        status: "fail",
        msg: err.message,
      });
    }
  },
};
