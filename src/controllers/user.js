'use strict'
const md5 = require('md5');
const repository = require('../repositories/user');
const ValidationContract = require('../validators/file-validator');

exports.create = async (req, res, user) => {

    const { fullName, email, password, cpf, role } = user

    let contract = new ValidationContract();
    contract.hasMinLen(fullName, 3, 'O nome deve ter pelo menos 3 letras');
    contract.isEmail(email, 'Email inválido');
    contract.hasMinLen(password, 6, 'A senha deve ter pelo menos 6 letras');

    if (!contract.errorsisValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            fullName,
            cpf,
            email,
            password: md5(password + global.SALT_KEY),
            roles: [role || 'user']
        });

        res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar usuário.' });
    }
};
exports.list = async (req, res) => {
    try {
        const users = await repository.list();
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição!' });
    }
};