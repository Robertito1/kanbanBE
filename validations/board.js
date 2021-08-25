const { check, validationResult } = require("express-validator");

exports.validateHandleBoard = [
  check("columns", "Columns must be send in an array.").isArray().notEmpty(),
  check("columns.*._id", "Column ID must be a string.").isString().optional(),
  check("columns.*.name", "Columns name must be a string.").isString(),
  check("columns.*.cards", "Cards must be send in an array.").isArray().optional(),
  check("columns.*.cards.*._id", "Card ID must be a string.").isString().optional(),
  check("columns.*.cards.*.name", "Card name must be a string.").isString(),
  check("columns.*.cards.*.description", "Card description must be a string.").isString().optional(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];