const HttpStatus = require('http-status-codes');
const fileService = require('./FileService.js');
var fs = require('fs');
/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchAll(req, res, next) {
  fileService
    .getAllFiles()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a file based on the id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchById(req, res, next) {
  fileService
    .getFile(req.params.id)
    .then(data => res.download(data))
    .catch(err => next(err));
}

/**
 * Upload a file.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function upload(req, res, next) {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  fileService
    .uploadFile(req.files.sampleFile)
    .then(data => res.data)
    .catch(err => next(err));
}

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
  fileService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
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
  update,
  deleteFile
}