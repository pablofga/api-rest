'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = Schema({
    titulo: String,
    picture: String,
    producto: String
});

module.exports = mongoose.model('Image', ImageSchema);