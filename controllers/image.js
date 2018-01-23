'use strict'

var path = require('path');
var fs = require('fs');
var Image = require('../models/image');
var Producto = require('../models/producto');


function pruebas(req, res) {
    res.status(200).send({ message: 'Pruebas de controlador de imagenes' });
}

function getImage(req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if (err) {
            res.status(500).send({ message: 'Error al devolver la imagen' });
        } else {
            if (!image) {
                res.status(404).send({ message: 'No existe la imagen' });
            } else {
                Producto.populate(image, { path: 'producto' }, (err, image) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        res.status(200).send({ image: image });
                    }
                });
            }
        }
    });
}
//se pueden solicitar las imagenes de un producto o si se deja a null se devuelven todas

//se pueden solicitar las imagenes de un producto o si se deja a null se devuelven todas
function getImages(req, res) {
    var productoId = req.params.producto;

    if (!productoId) {
        var find = Image.find({}).sort('+titulo');
    } else {
        var find = Image.find({ producto: productoId }).sort('+titulo');
    }

    // Partecomun aplica a los dos casos del IF anterior -->Lo extraemos
    find.exec((err, images) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!images) {
                res.status(404).send({ message: 'No hay imágenes en este producto' });
            } else {
                //inicio populate
                Producto.populate(images, { path: 'producto' }, (err, images) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        //sin populate poner solo esta linea
                        res.status(200).send({ images: images });
                    }
                });
                //fin populate
            }
        }
    });

}

function getImages2(req, res) {

    Image.find({}).sort('+_id').exec((err, images) => {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al devolver las imágenes' });
        } else {
            if (!images) {
                res.status(404).send({ status: "ko", code: 404, message: 'No hay imágenes' });
            } else {
                res.status(200).send({ status: "ok", code: 200, images: images });
            }
        }
    });
}

function saveImage(req, res) {
    var image = new Image();
    var params = req.body;

    image.titulo = params.titulo;
    image.picture = null; //params.picture;
    image.producto = params.producto;

    //Salvamos el producto
    image.save((err, imageStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!imageStored) {
                res.status(404).send({ message: 'No se ha guardado la imagen!!' });
            } else {
                res.status(200).send({ image: imageStored });
            }

        }
    });
}

function updateImage(req, res) {
    var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!imageUpdated) {
                res.status(404).send({ message: 'No se ha actualizado la imagen' });
            } else {
                res.status(200).send({ image: imageUpdated });
            }
        }
    });
}

function deleteImage(req, res) {
    var imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar la imagen' });
        } else {
            if (!imageRemoved) {
                res.status(404).send({ message: 'No se ha podido eliminar la imagen' });
            } else {
                //res.status(200).send({ image: imageRemoved });

                // Inicio populate  de producto dentro de image
                Producto.populate(imageRemoved, { path: 'producto' }, (err, imageRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        //sin populate poner solo esta linea
                        res.status(200).send({ image: imageRemoved });
                    }
                });
                // Fin populate
            }
        }
    });
}

function deleteImage2(req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, function(err, image) {
        if (err) {
            res.status(500).send({ status: "ko", code: 500, message: 'Error al borrar la imagen' });
        }
        if (!image) {
            res.status(404).send({ status: "ko", code: 404, message: 'No existe la imagen' });
        } else {
            image.remove(err2 => {
                if (err2) {
                    res.status(500).send({ status: "ko", code: 500, message: 'Error al borrar la imagen' });
                } else {
                    res.status(200).send({ status: "ok", code: 200, message: 'La imagen se ha eliminado' });
                }
            })
        }
    });
}

function uploadImage(req, res) {
    var imageId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[1];

        //res.status(200).send({ status: "ok", code: 200, message: file_path, message2: file_name });

        Image.findByIdAndUpdate(imageId, { picture: file_name }, (err, imageUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Error en la petición' });
            } else {
                if (!imageUpdated) {
                    res.status(404).send({ message: 'No se ha actualizado la imagen' });
                } else {
                    res.status(200).send({ image: imageUpdated });
                }
            }
        });
    } else {
        res.status(200).send({ message: 'No has subido ninguna imagen!!' });
    }
}


// Obtiene la imagen a partir del nombre de la imagen --> obtiene nombre fichero
function getImageFile(req, res) {
    var imageId = req.params.id;
    //console.log('identificador de la imagen: ' + imageId);

    Image.findById(imageId, (err, image) => {
        if (err) {
            res.status(500).send({ message: 'Error al devolver la imagen' });
        } else {
            if (!image) {
                res.status(404).send({ message: 'No existe la imagen' });
            } else {
                Producto.populate(image, { path: 'producto' }, (err, image) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        var imageFile = image.picture;
                        fs.exists('./uploads/' + imageFile, function(exists) {
                            if (exists) {
                                res.sendFile(path.resolve('./uploads/' + imageFile));
                            } else {
                                res.status(200).send({ message: 'No existe la imagen!!' });
                            }
                        });
                    }
                });
            }
        }
    });
}

// Se le pasa directamente el nombre de fichero para obtener la imagen
function getImageFile2(req, res) {

    var imageFile = req.params.imageFile;

    fs.exists('./uploads/' + imageFile, function(exists) {
        if (exists) {
            res.sendFile(path.resolve('./uploads/' + imageFile));
        } else {
            res.status(200).send({ message: 'No existe la imagen!!' });
        }
    });
}


module.exports = {
    pruebas,
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile,
    getImageFile2
}