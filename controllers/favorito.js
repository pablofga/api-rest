'use strict'

var Favorito = require('../models/favorito');

function prueba(req,res){ //function(req,res)

if (req.params.nombre){
    var nomb=req.params.nombre;
}else{
    var nomb="SIN NOMBRE";
}
    var f = new Date();

    res.status(200).send({
        dato:[2,3,4,5],
        message:"Hola mundo con NODEJS y EXPRESS - " + nomb + " " + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
    });

} 

function getFavorito(req,res){
    var favoritoId=req.params.id;
    Favorito.findById(favoritoId, function(err,favorito){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if(!favorito){
                res.status(404).send({message:'No hay marcador'});
            }else{
                res.status(200).send({favorito});
            }
        }
    });
}

function getFavoritos(req,res){
    
    Favorito.find({}).sort('+_id').exec((err,favoritos)=> {
        if(err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }else{
            if(!favoritos){
                res.status(404).send({message:'No hay marcadores'});
            }else{
                res.status(200).send({favoritos});    
            }
        }
    });
}

function saveFavorito(req,res){
    var favorito = new Favorito();
    var params=req.body;
    
    favorito.title=params.title;
    favorito.description=params.description;
    favorito.url=params.url;

    //Salvamos el favorito
    favorito.save((err,favoritoStored)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el marcador'});
        }else{
            res.status(200).send({favorito:favoritoStored});
        }
    });
}

function updateFavorito(req,res){
    var favoritoId=req.params.id;
    var update=req.body;
    
    Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdated) =>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }else{
            res.status(200).send({favorito:favoritoUpdated});
        }
    });
}

function deleteFavorito(req,res){
    var favoritoId=req.params.id;

    Favorito.findById(favoritoId, function(err,favorito){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }
        if(!favorito){
            res.status(404).send({message:'No hay marcador'});
        }else{
            favorito.remove(err2=>{
                if(err2){
                    res.status(500).send({message:'Error al borrar el marcador'});
                }else{
                    res.status(200).send({message:'El marcador se ha eliminado'});
                }
            })
        }
    });
}

module.exports={
    prueba,
    getFavorito,
    getFavoritos,
    saveFavorito,
    updateFavorito,
    deleteFavorito
}