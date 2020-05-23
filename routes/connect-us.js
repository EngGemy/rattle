const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Connect = require("../model/connect-us");
const auth = require("../middleware/auth")
const userRole = require("../middleware/userRole")
const superAdmin = require("../middleware/superAdmin")

router.get("/getConnect",auth, async (req, res) => {
  try {
    const contact = await Connect.find();
    res.send(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get("/getSpecificConnect/:id",[auth,superAdmin], async (req, res) => {
  try {
    const contact = await Connect.findById(req.params.id);
    if(!contact) return res.status(404).send('this contact not found')
    res.send(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* ------------the route for adding-------------- */

router.post("/addConnect",[auth,userRole], async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      name: Joi.string().min(0).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      mobile: Joi.string().required(),
      message: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.send({
        status: false,
        message: result.error.details[0].message,
      });
    }
    /* end validation by joi library */

    const newConnect = new Connect({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message,
    });
    await newConnect.save((err, connect) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      res.send({
        status: true,
        message: "Connect saved",
        connect,
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.put("/editConnect/:id",auth, async (req, res) => {
  try {
       /* start validation by joi library */
       const schema = {
        name: Joi.string().min(0).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        mobile: Joi.string().required(),
        message: Joi.string().required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.send({
          status: false,
          message: result.error.details[0].message,
        });
      }
    const connect = await  Employement.findByIdAndUpdate(req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message,
    },
    {new:true});

    if (!connect) return res.status(404).send("this connect not found");
    await connect.save((err, connect) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.send({
        status: true,
        message: "Connect Edited",
        connect
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


/* ------------the route for deleting-------------- */

router.delete("/deleteConnect/:id",[auth,superAdmin],async(req,res) => {
  try {
     const soecificConnect = await Connect.findByIdAndRemove(req.params.id)
    if(!soecificConnect) return res.status(404).send("Not find this id");
    return res.send({
      suceess :true,
      message: " this is removed "
    })
    } catch (error) {
    res.status(500).send(error.message);
  }
})
module.exports = router;
