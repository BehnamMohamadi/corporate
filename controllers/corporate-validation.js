const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/app-error");

const validateCorporate = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("name between 3 and 30 chars"),

  body("registrationNumber")
    .isString()
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .trim()
    .withMessage("registrationNumber between 3 and 30 chars"),

  body("city")
    .optional()
    .isString()
    .isLowercase()
    .withMessage("city type is not valid")
    .isAlpha(),

  body("province").isString().trim().optional().isLowercase().isAlpha(),

  body("establishmentDate")
    .isDate()
    .withMessage("establishmentDate type is not validate"),

  body("telphone")
    .isString()
    .withMessage("telphone type is not validate")
    .isNumeric()
    .isLength({ min: 11, max: 11 }),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log(errors);
      next(new AppError(400, errors));
    }

    next();
  },
];

module.exports = validateCorporate;
