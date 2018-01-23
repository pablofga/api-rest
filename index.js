'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3678; //variable de entorno PORT o directamente nº puerto

mongoose.connect('mongodb://localhost:27017/cursofavoritos', (err, res) => {
    if (err) { //si existe error al conectar a la bbdd lo capturamos
        throw err;
    } else { //si no arranca el servidor
        var f = new Date();

        console.log('Conexión a MongoDB correcta' + " " + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());

        app.listen(port, function() {
            // console.log(`API REST FAVORITOS funcionando en http://localhost:${port}`); //con comillas invertidas se pueden meter variables dentro
            console.log("API REST FAVORITOS funcionando en http://localhost:" + port);
        });
    }
});