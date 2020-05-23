const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConnectSchema = new Schema({
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
  message: {
    type: String,
    required: true,
  },
});

const Connect = mongoose.model("Connect", ConnectSchema);
module.exports = Connect;
