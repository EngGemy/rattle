const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/user");


/* ------------the route for register user-------------- */
router.post("/authUser", async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    /* end validation by joi library */

    /* Make sure it is correct email and passsword*/
    let user = await User.findOne({ email: req.body.email }); //email
    if (!user) return res.status(400).send("Invalid Email");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user["password"]
    ); //password
    if (!validPassword) return res.status(400).send("Invalid Password");

    //token
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
