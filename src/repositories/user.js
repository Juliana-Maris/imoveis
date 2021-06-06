'use strict';
const mongoose = require('mongoose');
const User = require('../models/user');
const Collection = mongoose.model('User');

exports.create = async (data) => {
    return Collection.create(new User(data));
};

exports.authenticate = async ({ email, password }) => {
    return User.findOne({ email, password });
}
exports.getById = async (id) => {
    return User.findById(id);
}