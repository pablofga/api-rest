'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/producto/:id', ProductoController.getProducto);
api.get('/productos', ProductoController.getProductos);
api.post('/producto', ProductoController.saveProducto);
api.put('/producto/:id', ProductoController.updateProducto);
api.delete('/producto/:id', ProductoController.deleteProducto);
api.post('/upload-file', multipartMiddleware, ProductoController.uploadFile);


module.exports = api;