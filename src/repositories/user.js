
'use strict';
const mongoose = require('mongoose');
const UserCollection = mongoose.model('User');

exports.create = async (data) => {
    var user = new User(data);
    await UserCollection.save(user);
}
exports.authenticate = async ({ email, password }) => {
    return UserCollection.findOne({ email, password });
}
exports.getById = async (id) => {
    return UserCollection.findById(id);
}


