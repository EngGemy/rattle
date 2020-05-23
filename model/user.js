const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  isRole: {
    type: Number,
    required: true, // super admin = 1 // user = 2
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
