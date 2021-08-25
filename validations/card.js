const { check, validationResult } = require("express-validator");

exports.validateCardEdit = [
  check("name", "Name must be a string.").isString().notEmpty().optional(),
  check("description", "description must be a string.").isString().optional(),
  check("tags", "Tags must be send in an array.").isArray().optional(),
  check("tags.*", "Tags must be a string.").isString().optional(),
  check("attachments", "Attachments must be send in an array.").isArray().optional(),
  check("attachments.*.name", "Attachments must be a string.").isString(),
  check("attachments.*.url", "Attachments must be a string.").isString(),
  check("deadline", "deadline must be a date.").isString().optional(),
  check("colorCode").isString().optional(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];
