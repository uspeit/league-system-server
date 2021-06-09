import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs.readFileSync("keys/private.pem");

const userService = new UserService(privateKey);

const router = express.Router();
router.post("/login", userService.postLogin);
router.post("/signup", userService.postSignup);

export class UserService {
  constructor(privateKey) {
    this.privateKey = privateKey;
  }

  // POST: /users/login
  async postLogin(req, res) {
    if (!req.body.username || !req.body.password)
      res.status(400).send({ err: "Please enter username and password" });
    else {
      let token = await User.login(req.body.username, req.body.password);
      if (token) {
        token = jwt.sign(token, this.privateKey, {
          algorithm: "RS256",
        });
        res.status(200).send({
          token: token,
        });
      } else
        res.status(400).send({
          err: "Invalid Username or Password",
        });
    }
  }

  // POST: /users/signup
  async postSignup(req, res) {
    if (req.body.masterPassword != "345")
      // Require password "345" as master password for easy management
      return res.status(400).send({
        err: "Unauthorized",
      });

    if (
      !req.body.username ||
      !req.body.password ||
      !req.body.email ||
      !req.body.role ||
      !req.body.idUserNum
    )
      return res.status(400).send({
        err: "Please enter username, password, email and role",
      });

    const err = await User.register(
      req.body.username,
      req.body.password,
      req.body.idUserNum,
      req.body.email,
      req.body.role
    );
    if (err === null)
      return res.status(200).send({
        err: null,
      });
    else
      return res.status(400).send({
        err: err,
      });
  }
}

export default router;
