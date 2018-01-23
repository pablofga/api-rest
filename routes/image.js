'use strict'

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/prueba-image', ImageController.pruebas);
api.get('/image/:id', ImageController.getImage);
api.get('/images/:producto?', ImageController.getImages);
api.post('/image', ImageController.saveImage);
api.put('/image/:id', ImageController.updateImage);
api.delete('/image/:id', ImageController.deleteImage);
api.post('/upload-image/:id', multipartMiddleware, ImageController.uploadImage);
api.get('/get-image2/:imageFile', multipartMiddleware, ImageController.getImageFile2);
api.get('/get-image/:id', multipartMiddleware, ImageController.getImageFile);


module.exports = api;