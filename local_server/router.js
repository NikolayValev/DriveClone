const express = require('express');
const router = express.Router();
const fileController = require('./controller.js');
const validator = require('./validator.js');

/**
 * GET /api/files
 */
router.get('/', fileController.fetchAll);

/**
 * GET /api/files/:id
 */
router.get('/:id', fileController.fetchById);

/**
 * POST /api/files
 */
router.post('/', validator.fileValidator, fileController.upload);

/**
 * PUT /api/files/:id
 */
//router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
//router.delete('/:id', findUser, userController.deleteUser);

module.exports = router;