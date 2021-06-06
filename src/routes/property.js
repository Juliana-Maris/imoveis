'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/property');
const authService = require('../services/auth-service');

router.get('/', controller.list);
router.get('/:bedroom', controller.search);

// router.post('/', authService.isAdmin, controller.create);
router.post('/', controller.create);
// router.put('/:id', authService.isAdmin, controller.update);
router.put('/:id', controller.update);
// router.delete('/', authService.isAdmin, controller.remove);
router.delete('/', controller.remove);

module.exports = router;