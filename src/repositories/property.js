'use strict';
const mongoose = require('mongoose');
const Property = require('../models/property');
const Collection = mongoose.model('Property');

exports.create = async (data) => {
    await Collection.create(new Property(data));
}

exports.update = async (id, property) => {
    await Collection.findByIdAndUpdate(id, {
        $set: property
    });
}

exports.remove = async (id) => {
    await Collection.findOneAndRemove(id);
}

exports.list = async () => {
    return Collection.find();
}

exports.search = async (data) => {
    const property = {}

    if (data.cep) {
        property.cep = data.cep
    }
    if (data.number) {
        property.number = data.number
    }
    if (data.additionalData) {
        property.additionalData = data.additionalData
    }
    if (data.rent) {
        property.rent = data.rent
    }
    if (data.bedroom) {
        property.bedroom = data.bedroom
    }
    if (data.isAvailable) {
        property.isAvailable = data.isAvailable
    }

    return Collection.find(property);
}


