'use strict'

var express = require('express');
var ProductoController = require ('../controllers/producto');
var FavoritoController = require ('../controllers/favorito');
var ImageController = require ('../controllers/image');
var api=express.Router();

api.get('/producto/:id',ProductoController.getProducto);
api.get('/productos',ProductoController.getProductos);
api.post('/producto',ProductoController.saveProducto); 
api.put('/producto/:id',ProductoController.updateProducto); 
api.delete('/producto/:id',ProductoController.deleteProducto);

api.get('/favorito/:id',FavoritoController.getFavorito);
api.get('/favoritos',FavoritoController.getFavoritos);
api.post('/favorito',FavoritoController.saveFavorito); 
api.put('/favorito/:id',FavoritoController.updateFavorito); 
api.delete('/favorito/:id',FavoritoController.deleteFavorito);

api.get('/image/:id',ImageController.getImage);
api.get('/images',ImageController.getImages);
api.post('/image',ImageController.saveImage); 
api.put('/image/:id',ImageController.updateImage); 
api.delete('/image/:id',ImageController.deleteImage);

module.exports=api;