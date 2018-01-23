//partes del express
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var favorito_routes = require('./routes/favorito');
var producto_routes = require('./routes/producto');
var image_routes = require('./routes/image');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS PUT, DELETE');

    next();
});

app.use('/api',favorito_routes);
app.use('/api',producto_routes);
app.use('/api',image_routes);

module.exports=app;