'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cep: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    additionalData: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }]
});
module.exports = mongoose.model("Property", schema);