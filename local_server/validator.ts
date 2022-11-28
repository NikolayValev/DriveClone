//const { check, validationResult } = require('express-validator');
//https://stackoverflow.com/questions/55772477/how-to-implement-validation-in-a-separate-file-using-express-validator
/**/
/*
localServer::fileValidator() localServer::fileValidator()

NAME

        fileValidator(req, res, next)
          - validates if files have been passed to the upload function

SYNOPSIS

        fileValidator(req, res, next)
            req             --> a HTTP2 request object
            res             --> a HTTP2 response object
            next             --> a callback that has two field done and value.

DESCRIPTION

        This function will check if req.files exsists and if it has more than
        zero entries.

RETURNS

        Returns an object with a property done if successfull otherwise sets
        the response object's status to 400 and an error message.
*/
/**/
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