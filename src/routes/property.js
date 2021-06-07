'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/property');

router.post('/', async (req, res) => {
    return controller.create(req, res)
});

router.put('/:id', async (req, res) => {
    return controller.update(req, res, req.params.id)
});

router.delete('/:id', async (req, res) => {
    return controller.remove(req, res, req.params.id)
});

router.get('/', async (req, res) => {
    return controller.list(req, res)
});

router.get('/:bedroom', async (req, res) => {
    return controller.search(req, res)
});

module.exports = router;