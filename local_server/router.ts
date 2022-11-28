const express = require('express');
const router = express.Router();
const fileController = require('./controller.ts');
const validator = require('./validator.ts');

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
 * DELETE /api/users/:id
 */
router.delete('/:id', fileController.deleteFile);

module.exports = router;