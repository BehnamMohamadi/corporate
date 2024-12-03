const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 30,
  },
  gender: {
    type: String,
    enum: ["woman", "man", "not-set"],
    default: "not-set",
    required: false,
  },
  birthDate: {
    required: true,
    type: Date,
  },

  phoneNumber: {
    type: [String],
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return v.every((num) => /^09[0-9]{9}$/.test(num));
      },
      message: (props) => ` ${props.value} شماره تلفن معتبر نیست یا تکراری است!`,
    },
  },
  nationalId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /[0-9]{10}$/.test(v);
      },
      message: (props) => ` ${props.value} شماره ملی معتبر نیست یا تکراری است!`,
    },
  },
  city: {
    type: String,
    required: false,
    default: "not-set",
  },
  companyName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  role: {
    type: String,
    enum: ["employee", "manager"],
    default: "employee",
    required: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = model("Employee", EmployeeSchema);
