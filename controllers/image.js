'use strict'

var Image = require('../models/image');
var Producto = require('../models/producto');

function pruebas(req,res){
                res.status(200).send({message:'Pruebas de controlador de imagenes'});
}

function getImage(req,res){
    var imageId=req.params.id;
    Image.findById(imageId, (err,image)=>{
        if(err){
            res.status(500).send({message:'Error al devolver la imagen'});
        }else{
            if(!image){
                res.status(404).send({message:'No existe la imagen'});
            }else{
                Producto.populate(image,{path:'producto'},(err, image)=>{
                    if(err){
                        res.status(500).send({message:'Error en la petición'});
                    }else{
                        res.status(200).send({image:image});
                    }    
                });  
            }
        }
    });
}
//se pueden solicitar las imagenes de un producto o si se deja a null se devuelven todas

//se pueden solicitar las imagenes de un producto o si se deja a null se devuelven todas
function getImages(req,res){
    var productoId = req.params.producto;
   
    if(!productoId){
        Image.find({}).sort('-titulo').exec((err,images)=> {
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!images){
                    res.status(404).send({message:'No hay imágenes en este producto'});
                }else{
                    //inicio populate
                    Producto.populate(images,{path:'producto'},(err, images)=>{
                        if(err){
                            res.status(500).send({message:'Error en la petición'});
                        }else{
                            //sin populate poner solo esta linea
                            res.status(200).send({images:images});
                        }    
                    });     
                    //fin populate
                }
            }
        });
    }else{
  Image.find({producto:productoId}).sort('-titulo').exec((err,images)=> {
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!images){
                    res.status(404).send({message:'No hay imágenes en este producto'});
                }else{
                    //inicio populate
                    Producto.populate(images,{path:'producto'},(err, images)=>{
                        if(err){
                            res.status(500).send({message:'Error en la petición'});
                        }else{
                            //sin populate poner solo esta linea
                            res.status(200).send({images:images});
                        }    
                    });     
                    //fin populate
                }
            }
        });
    }
}

function getImages2(req,res){
    
    Image.find({}).sort('+_id').exec((err,images)=> {
        if(err){
            res.status(500).send({status:"ko", code:500, message:'Error al devolver las imágenes'});
        }else{
            if(!images){
                res.status(404).send({status:"ko", code:404, message:'No hay imágenes'});
            }else{
                res.status(200).send({status:"ok", code:200, images:images});    
            }
        }
    });
}

function saveImage(req,res){
    var image = new Image();
    var params=req.body;
    
    image.titulo=params.titulo;
    image.picture=null; //params.picture;
    image.producto=params.producto;

    //Salvamos el producto
    image.save((err,imageStored)=>{
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!imageStored){
                res.status(404).send({message:'No se ha guardado la imagen!!'});
            }else{
                res.status(200).send({image:imageStored});
            }
            
        }
    });
}

function updateImage(req,res){
    var imageId=req.params.id;
    var update=req.body;
    
    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) =>{
        if(err){
            res.status(500).send({status:"ko", code:500, message:'Error al actualizar la imagen'});
        }else{
            res.status(200).send({status:"ok", code:200, image:imageUpdated});
        }
    });
}

function deleteImage(req,res){
    var imageId=req.params.id;

    Image.findById(imageId, function(err,image){
        if(err){
            res.status(500).send({status:"ko", code:500, message:'Error al borrar la imagen'});
        }
        if(!image){
            res.status(404).send({status:"ko", code:404, message:'No existe la imagen'});
        }else{
            image.remove(err2=>{
                if(err2){
                    res.status(500).send({status:"ko", code:500, message:'Error al borrar la imagen'});
                }else{
                    res.status(200).send({status:"ok", code:200, message:'La imagen se ha eliminado'});
                }
            })
        }
    });
}

module.exports={
    pruebas,
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage
}