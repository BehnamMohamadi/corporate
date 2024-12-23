const { Schema, model } = require("mongoose");
const { getIranProvinces } = require("../utils/iran-provinces");
const { isDate, isNumeric, isMobilePhone } = require("validator");

const corporateSchema = new Schema(
  {
    // نام شرکت، شماره ثبت(یکتا)، شهر، استان، تاریخ ثبت و شماره تلفن(یکتا).
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },

    //شماره ثبت
    registrationNumber: {
      type: String,
      unique: true,
      required: [true, "corporate registration number is required"],
      minlength: [6, "corporate registration number length must be 10 characters"],
      maxlength: [6, "corporate registration number length must be 10 characters"],
      validate: {
        validator: (value) => isNumeric(value),
        message: "corporate registration number must be contain numbers only",
      },
      trim: true,
    },

    city: {
      type: String,
      default: "not-set",
      required: true,
      trim: true,
    },

    province: {
      type: String,
      default: "not-set",
      trim: true,
      lowercase: true,
      validate: async (value) => {
        try {
          const provinces = await getIranProvinces();
          return provinces.includes(value);
        } catch (err) {
          throw err;
        }
      },
      message: "provide valid province",
    },

    //تاریخ ثبت
    establishmentDate: {
      required: true,
      type: Date,
    },

    telphone: {
      type: String,
      unique: true,
      required: [true, "telphone is required"],
      validate: {
        validator: (value) => {
          if (!value) return false;

          return isMobilePhone(value, "fa-IR");
        },
        message: "provide valid telphone",
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Corporate", corporateSchema);
