'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.post('/', async (req, res) => {

    const { body: { fullName, cpf, email, password, role } } = req
    const user = { fullName, email, password, cpf, role }
    return controller.create(req, res, user)
});

router.get('/', async (req, res) => {
    return controller.list(req, res)
});

module.exports = router;