
'use strict'
const md5 = require('md5');
const repository = require('../repositories/user');
const authService = require('../services/auth-service');
const ValidationContract = require('../validators/file-validator');

exports.create = async (req, res, next) => {

    const { body: { fullName, cpf, email, password } } = req
    console.log('fullName', fullName)
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.fullName, 3, 'O nome deve ter pelo menos 3 letras');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 letras');

    // se os dados forem invalidos
    if (!contract.errorsisValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });

        res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar usuário.' });
    }
};
exports.authenticate = async (req, res, next) => {
    let contract = new ValidationContract();
    //contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 letras');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 letras');

    if (!contract.errorsisValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if (!user) {
            res.status(404).send({ message: "Usuário ou senha inválidos!" });
            return;
        }
        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });
        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar usuário.' });
    }
};
exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data.id);

        if (!user) {
            res.status(401).send({ message: "Usuário não encontrado!" });
            return;
        }
        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });
        res.status(201).send({
            token: tokenData,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar usuário!' });
    }
};