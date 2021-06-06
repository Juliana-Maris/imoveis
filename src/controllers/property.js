'use strict'
const md5 = require('md5');
const repository = require('../repositories/property');

exports.create = async (req, res) => {
    const { cep, number, additionalData, rent, bedroom, isAvailable } = req.body;
    const property = {
        cep,
        number,
        additionalData,
        rent,
        bedroom,
        isAvailable,
        password: md5(req.body.password + global.SALT_KEY),
        roles: ["user"]
    };

    try {
        await repository.create(property);
        res.status(201).send({ message: "Propriedade cadastrada com sucesso!" });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar usuário.' });
    }
};

exports.update = async (req, res, id) => {
    try {
        const { cep, number, additionalData, rent, bedroom, isAvailable, role } = req.body;
        const property = { cep, number, additionalData, rent, bedroom, isAvailable, role };

        await repository.update(id, property);
        res.status(200).send({ message: 'Propriedade atualizada com sucesso.' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição.' });
    }
};
exports.remove = async (req, res, id) => {
    try {
        await repository.remove(id);
        res.status(200).send({ message: 'Propriedade excluída com sucesso.' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição!' });
    }
};

exports.list = async (req, res) => {
    try {
        const properties = await repository.list();
        res.status(200).send(properties);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição!' });
    }
};

exports.search = async (req, res, next) => {
    try {
        const { rent, isAvailable, cep, number, additionalData, bedroom } = req.params
        const params = { rent, isAvailable, cep, number, additionalData, bedroom }

        const properties = await repository.search(params);
        res.status(200).send(properties);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição!' });
    }
};
