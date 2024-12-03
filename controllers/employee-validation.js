const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/app-error");

// Middleware for validating employee data
const validateEmployee = [
  body("firstName")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("firstname between 3 and 30 chars"),

  body("lastName")
    .optional()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("lastname between 3 and 30 chars"),

  body("gender")
    .optional()
    .isIn(["woman", "man", "not-set"])
    .withMessage("gender is not validate"),

  body("birthDate").isDate().withMessage("birth type is not validate"),

  body("phoneNumber")
    .isArray()
    .withMessage("phoneNumber type is not validate")
    .custom((numbArr) => {
      numbArr.forEach((numb) => {
        if (!/^09[0-9]{9}$/.test(numb)) {
          throw new Error(`${numb} phoneNumber is not valid`);
        }
      });
      return true;
    }),

  body("nationalId")
    .isString()
    .matches(/^[0-9]{10}$/)
    .withMessage("nationalId is not valid"),

  body("city").optional().isString().withMessage("city type is not valid"),

  body("companyName")
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage("companyName between 2and 40 charector"),

  body("role").optional().isIn(["employee", "manager"]).withMessage("role is not valid"),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new AppError(400, errors));
    }
    next();
  },
];

module.exports = validateEmployee;
