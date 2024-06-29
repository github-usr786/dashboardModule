const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/input', fileController.processInput);
router.get('/files', fileController.getFiles);

module.exports = router;