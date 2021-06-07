'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/property');
// const authService = require('../services/auth-service');

// router.post('/', authService.isAdmin, controller.create);
router.post('/', async (req, res) => {
    return controller.create(req, res)
});

// router.put('/:id', authService.isAdmin, controller.update);
router.put('/:id', async (req, res) => {
    return controller.update(req, res, req.params.id)
});

// router.delete('/', authService.isAdmin, controller.remove);
router.delete('/:id', async (req, res) => {
    return controller.remove(req, res, req.params.id)
});
//é apenas "/"
router.get('/', async (req, res) => {
    return controller.list(req, res)
});

// o que é isto? pra que serve?
router.get('/:bedroom', async (req, res) => {
    return controller.search(req, res)
});

module.exports = router;