const HttpStatus = require('http-status-codes');
const fileService = require('./FileService.ts');
/**/
/*
localServer::fetchAll() localServer::fetchAll()

NAME

        fetchAll(req, res, next)
          - fetches all the files and folders in the current directory

SYNOPSIS

        fetchAll(req, res, next)
            req             --> a HTTP2 request object
            res             --> a HTTP2 response object
            next             --> a callback that has two field done and value.

DESCRIPTION

        This function will use the module constant fileService and call its
        method getAllFiles() the response is then preprocessed as its put in
        a json format and is returned. On error we set the value of next() to
        the error we encountered and we abort.

RETURNS

        Doesnt return in the trivial sense of the word but it sets the body of
        the response to either the data returned by the fileService or an
        error object
*/
/**/
function fetchAll(req, res, next) {
  fileService
    .getAllFiles()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**/
/*
localServer::fetchById() localServer::fetchById()

NAME

        fetchById(req, res, next)
          - fetches a file by its id and downloads it in userspace

SYNOPSIS

        fetchById(req, res, next)
            req             --> a HTTP2 request object
            res             --> a HTTP2 response object
            next             --> a callback that has two field done and value.

DESCRIPTION

        This function will use the module constant fileService and call its
        method getFile() the response is downloaded on the user's device and
        the HTTP body is set to be the file descriptor itself. the id of the
        file is req.params.id.
        On error we set the value of next() to the error we encountered.

RETURNS

        Doesnt return in the trivial sense of the word but it sets the body of
        the response to either the data returned by the fileService or an
        error object
*/
/**/
function fetchById(req, res, next) {
  fileService
    .getFile(req.params.id)
    .then(data => res.download(data))
    .catch(err => next(err));
}

/**/
/*
localServer::upload() localServer::upload()

NAME

        upload(req, res, next)
          - uploads a file to the local server. Called on a POST req

SYNOPSIS

        upload(req, res, next)
            req             --> a HTTP2 request object
            res             --> a HTTP2 response object
            next             --> a callback that has two field done and value.

DESCRIPTION

        This function will use the module constant fileService and call its
        method uploadFile() the response is insignificant as the only thing
        that matters is if an error was thrown which is handled by the third
        chaining operator. The upload only works with one file at a time and
        the front end needs to call this multiple times if we want it to upload
        multiple files.
        On error we set the value of next() to the error we encountered.

RETURNS

        Doesnt return in the trivial sense of the word but it sets the body of
        the response to either the data returned by the fileService or an
        error object
*/
/**/
function upload(req, res, next) {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  fileService
    .uploadFile(req.files.sampleFile)
    .then(data => res.data)
    .catch(err => next(err));
}

/**/
/*
localServer::deleteFile() localServer::deleteFile()

NAME

        deleteFile(req, res, next)
          - deletes a file on the local machine based on its id.

SYNOPSIS

        upload(req, res, next)
            req             --> a HTTP2 request object
            res             --> a HTTP2 response object
            next             --> a callback that has two field done and value.

DESCRIPTION

        This function will use the module constant fileService and call its
        method deleteFile() the response is insignificant as the only thing
        that matters is if an error was thrown which is handled by the third
        chaining operator. The deletion is verified by the status of the
        response object which is checked one leve above on the call stack.
        On error we set the value of next() to the error we encountered.

RETURNS

        Doesnt return in the trivial sense of the word but it sets the body of
        the response to either the data returned by the fileService or an
        error object
*/
/**/
function deleteFile(req, res, next) {
  fileService
    .deleteFile(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}


module.exports = {
  fetchAll,
  fetchById,
  upload,
  deleteFile
}