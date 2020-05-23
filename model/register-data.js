const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  License: {
    type: String,
    required: true,
  },
  coords: {
    lat: Number,
    lng: Number,
  },
  address: {
    type: String,
    required: true
  },
  Capacity: {
    type: String,
    required: true,
  },
  numberOfNurseries: {
    type: Number,
    required: true,
  },
  watchPrice: {
    type: Number,
    required: true,
  },
  durationContract: {
    type: Number,
    required: true,
  },
  caseOfNurseries: {
    type: String,
    required: true,
  },
});

const Register = mongoose.model("Register", RegisterSchema);
module.exports = Register;
