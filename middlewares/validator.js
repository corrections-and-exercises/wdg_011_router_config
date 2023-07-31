import {body, validationResult} from 'express-validator';

export const inputValidationRules = () => {
  return [
    body('firstname').isLength({min: 2}),
    body('lastname').isLength({min: 2}),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log(errors);
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({[err.msg]: err.value}));
  return res.status(422).json({errors: extractedErrors});
};
