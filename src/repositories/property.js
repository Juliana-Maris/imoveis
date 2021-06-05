
'use strict';
const mongoose = require('mongoose');
const PropertyCollection = mongoose.model('Property');

exports.create = async (data) => {
    var user = new User(data);
    await PropertyCollection.save(user);
}
exports.getById = async (id) => {
    return PropertyCollection.findById(id);
}
exports.search = async (data) => {
    const property = {}

    if (data.cep) { property.cep = data.cep }
    if (data.number) { property.number = data.number }
    if (data.additionalData) { property.additionalData = data.additionalData }
    if (data.rent) { property.rent = data.rent }
    if (data.bedroom) { property.bedroom = data.bedroom }
    if (data.isAvailable) { property.isAvailable = data.isAvailable }

    return PropertyCollection.find(property);
}
exports.list = async () => {
    return PropertyCollection.find();
}

exports.update = async (id, data) => {

    const property = {}

    if (data.cep) { property.cep = data.cep }
    if (data.number) { property.number = data.number }
    if (data.additionalData) { property.additionalData = data.additionalData }
    if (data.rent) { property.rent = data.rent }
    if (data.bedroom) { property.bedroom = data.bedroom }
    if (data.isAvailable) { property.isAvailable = data.isAvailable }


    await PropertyCollection.findByIdAndUpdate(id, {
        $set: property
    });
}
exports.remove = async (id) => {
    await PropertyCollection.findOneAndRemove(id);
}
