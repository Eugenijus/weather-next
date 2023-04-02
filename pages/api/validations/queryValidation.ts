import { query } from "express-validator";

export const locationValidation = [
  query(["lat", "lon"])
    .notEmpty()
    .withMessage("Parameter missing")
    .isNumeric()
    .withMessage("Parameter should be numerical")
    .not()
    .isArray()
    .withMessage("Cannot have multiple parameters"),
  query("lat")
    .isFloat({ min: -90.0, max: 90.0 })
    .withMessage("A valid latitude must be between -90.0 and 90.0"),
  query("lon")
    .isFloat({ min: -180.0, max: 180.0 })
    .withMessage("A valid longitude may range from -180.0 to 180.0"),
];

export const citiesValidation = [
  query("namePrefix")
    .notEmpty()
    .withMessage("Parameter missing")
    .isString()
    .withMessage("Parameter namePrefix must be a string")
    .not()
    .isArray()
    .withMessage("Cannot have multiple parameters"),
  query("minPopulation")
    .optional() // make this parameter optional
    .notEmpty()
    .withMessage("Parameter minPopulation is required")
    .isNumeric()
    .withMessage("Parameter minPopulation must be numeric")
    .not()
    .isArray()
    .withMessage("Cannot have multiple parameters"),
  ,
];
