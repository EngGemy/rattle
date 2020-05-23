const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/user");
const auth = require("../middleware/auth")

/* ------------the route for get all users-------------- */
router.get("/getAllUsers", async (req, res) => {
  const Users = await User.find();
  res.send(Users);
});

/* ------------the route for register user-------------- */

router.post("/registerUser", async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      username: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } }),
      isRole: Joi.number().required(),
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    /* end validation by joi library */

    /* Make sure it is correct email*/
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isRole: req.body.isRole,
    });

    /*----------Encrypt------------*/
    const salt = await bcrypt.genSalt(10);
    user["password"] = await bcrypt.hash(user["password"], salt);
    user["confirmPassword"] = await bcrypt.hash(user["confirmPassword"], salt);

    /*-----------token----------*/
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    await user.save((err, user) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.header("x-auth-token", token).send({
        status: true,
        message: "user register",
        user,
        token
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


/* ------------the route for edit user-------------- */

router.put("/editUser/:id",auth, async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      username: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } }),
      isRole: Joi.number().required(),
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    /* end validation by joi library */

    /* Make sure it is correct id*/
    let user = await User.findOne({ email: req.body.email });
    

    user = await  User.findByIdAndUpdate(req.params.id,
      {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isRole: req.body.isRole,
    },
    {new:true});

    if (!user) return res.status(404).send("this user not found");
    /*----------Encrypt------------*/
    const salt = await bcrypt.genSalt(10);
    user["password"] = await bcrypt.hash(user["password"], salt);
    user["confirmPassword"] = await bcrypt.hash(user["confirmPassword"], salt);

    /*-----------token----------*/
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    await user.save((err, user) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.header("x-auth-token", token).send({
        status: true,
        message: "user Edited",
        user,
        token
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
