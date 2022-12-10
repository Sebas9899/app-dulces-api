const { response  } = require('express');

const Dulces = require('../models/dulce');

const getDulces = async ( req , res = response ) => {

    return res.json(await Dulces.find());
};

const postDulce = async ( req , res = response ) => {

    const dulce = req.body;

    const existeDulce = await Dulces.findOne({ nombre: dulce.nombre });

    if ( existeDulce ) {
        return res.json({
            ok: false,
            msg: "El dulce ya existe"
        })
    }

    const myDulce = new Dulces( dulce );
    myDulce.save();

    res.json({
        ok: true,
        msg: "Dulce creado con exito"
    })
};

const putDulce = async ( req, res = response ) => {

    const { id } = req.params;
    const dulce = req.body;

    await Dulces.findByIdAndUpdate( id, dulce );

    res.json({
        ok: true,
        msg: "Producto actualizado con exito"
    })

};

const deleteDulce = async ( req, res = response ) => {

    const { id } = req.params;

    await Dulces.findByIdAndUpdate( id,  { estado: false });

    res.json({
        ok: true,
        msg: "Producto eliminado con exito"
    })

};

module.exports = {
    getDulces,
    postDulce,
    putDulce,
    deleteDulce
}