'use strict'

var Producto = require('../models/producto');

function prueba(req, res) { //function(req,res)

    if (req.params.nombre) {
        var nomb = req.params.nombre;
    } else {
        var nomb = "SIN NOMBRE";
    }
    var f = new Date();

    res.status(200).send({
        dato: [2, 3, 4, 5],
        message: "Hola mundo con NODEJS y EXPRESS - " + nomb + " " + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
    });

}

function getProducto(req, res) {
    var productoId = req.params.id;
    Producto.findById(productoId, function(err, producto) {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al devolver el producto' });
        } else {
            if (!producto) {
                res.status(404).send({ status: "ko", code: 404, message: 'No existe el producto' });
            } else {
                res.status(200).send({ status: "ok", code: 200, producto: producto });
            }
        }
    });
}

function getProductos(req, res) {

    Producto.find({}).sort('+_id').exec((err, productos) => {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al devolver los productos' });
        } else {
            if (!productos) {
                res.status(404).send({ status: "ko", code: 404, message: 'No hay productos' });
            } else {
                res.status(200).send({ status: "ok", code: 200, productos: productos });
            }
        }
    });
}

function saveProducto(req, res) {
    var producto = new Producto();
    var params = req.body;

    producto.nombre = params.nombre;
    producto.descripcion = params.descripcion;
    producto.precio = params.precio;
    producto.imagen = params.imagen;

    //Salvamos el producto
    producto.save((err, productoStored) => {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al guardar el producto' });
        } else {
            res.status(200).send({ status: "ok", code: 200, producto: productoStored });
        }
    });
}

function updateProducto(req, res) {
    var productoId = req.params.id;
    var update = req.body;

    Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated) => {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al actualizar el producto' });
        } else {
            res.status(200).send({ status: "ok", code: 200, producto: productoUpdated });
        }
    });
}

function deleteProducto(req, res) {
    var productoId = req.params.id;

    Producto.findById(productoId, function(err, producto) {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al borrar el producto' });
        }
        if (!producto) {
            res.status(404).send({ status: "ko", code: 404, message: 'No existe el producto' });
        } else {
            producto.remove(err2 => {
                if (err2) {
                    res.status(500).send({ status: "ko", code: 500, message: 'Error al borrar el producto' });
                } else {
                    res.status(200).send({ status: "ok", code: 200, message: 'El producto se ha eliminado' });
                }
            })
        }
    });
}
// Primero se sube la imagen, se guardan los datos devueltos por el método y se actualiza el producto con esta info.

function uploadFile(req, res) {
    //var ProductoId = req.params.id;
    var file_name = 'No subido...';
    console.log(req.files.uploads[0]);
    console.log("AQUI");
    if (req.files) {
        var file_path = req.files.uploads[0].path;
        var file_split = file_path.split('\\');
        var file_name = file_split[1];
        var originalFilename = req.files.uploads[0].originalFilename;

        console.log('aaa ' + req.files.uploads[0].originalFilename + ' ' + file_name);

        //res.status(200).send({ message: 'El archivo se ha subido', filename: file_name, originalFilename: originalFilename });

        res.status(200).send({ status: "ok", code: 200, message: 'El archivo se ha subido', filename: file_name, originalFilename: originalFilename });

        /*  Producto.findByIdAndUpdate(ProductoId, { imagen: file_name }, (err, productoUpdated) => {
              if (err) {
                  res.status(500).send({ message: 'Error en la petición' });
              } else {
                  if (!productoUpdated) {
                      res.status(404).send({ message: 'El fichero no ha podido subirse' });
                  } else {
                      res.status(200).send({ producto: productoUpdated });
                  }
              }
          });*/
    } else {
        res.status(200).send({ message: 'No has subido ningún fichero!!' });
    }
}

module.exports = {
    getProducto,
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto,
    uploadFile
}