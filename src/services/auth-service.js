'use strict';
const jwt = require('jsonwebtoken');

// gera o token
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}
//recebe o token e verifica
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}
// serve como interceptador, permite bloquear algumas rotas
exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};
// para cadastrar admin
exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                jwt.verify(token, global > SALT_KEY, function (error, decoded) {
                    if (error) {
                        res.status(401).json({
                            message: 'token invalido'
                        });
                    } else {
                        if (decoded.roles.includes('admin')) {
                            next();
                        } else {
                            res.status(403).json({
                                message: 'funcionalidade restrita para administrador'
                            });
                        }
                    }
                });
            }
        });
    }
};