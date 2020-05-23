const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmploymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: String,
    required: true,
  },
  courses: {
    type: Array,
    required: true,
  },
  qualificationStatus: {
    type: String,
    required: true,
    default:"غير مؤهل",
  },
  cv: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  }
});

const Employment = mongoose.model("Employment", EmploymentSchema);
module.exports = Employment;
