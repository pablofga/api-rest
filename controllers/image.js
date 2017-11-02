'use strict'

var Image = require('../models/image');


function getImage(req,res){
    var imageId=req.params.id;
    Image.findById(imageId, function(err,image){
        if(err){
            res.status(500).send({status:"ko", code:500, message:'Error al devolver la imagen'});
        }else{
            if(!image){
                res.status(404).send({status:"ko", code:404, message:'No existe la imagen'});
            }else{
                res.status(200).send({status:"ok", code:200, image:image});
            }
        }
    });
}

function getImages(req,res){
    
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
    image.picture=params.picture;
    image.producto=params.producto;

    //Salvamos el producto
    image.save((err,imageStored)=>{
        if(err){
            res.status(500).send({status:"ko", code:500, message:'Error al guardar la imagen'});
        }else{
            res.status(200).send({status:"ok", code:200, image:imageStored});
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
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage
}