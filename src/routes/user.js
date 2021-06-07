'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
// const authService = require('../services/auth-service'); vou tirar jwt
//comentado de 7 a 13
//router.post('/authenticate', async (req, res) => {
//    await controller.authenticate()
//
//});
//router.post('/refresh-token', async (req, res) => {
//    authService.authorize, controller.refreshToken
//});
router.post('/', async (req, res) => {

    const { body: { fullName, cpf, email, password, role } } = req
    const user = { fullName, email, password, cpf, role }
    return controller.create(req, res, user)
});

router.get('/', async (req, res) => {
    return controller.list(req, res)
});

module.exports = router;