//const { check, validationResult } = require('express-validator');
//https://stackoverflow.com/questions/55772477/how-to-implement-validation-in-a-separate-file-using-express-validator
function fileValidator(req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  //res.status(202).send('Uploaded.')
  next();
}
module.exports = {
  fileValidator
}