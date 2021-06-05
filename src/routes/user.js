
'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.post('/login/', controller.login);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);
router.post('/', controller.create);

module.exports = router;