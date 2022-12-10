const { response } = require("express");
const Dulce = require("../models/dulce");
const Usuario = require('../models/user');

// ADD PURCHASES
const addPurchase = async ( req, res = response ) => {
    
    const { id } = req.params; 
    const { compras } = await Usuario.findById( id );
    const { cant, total, productos, ...rest } = req.body;

    const purchaseID = `${id}${compras.length + 1}`;

    // Formating minutes-adding zero if it has one character
    const time = new Date();
    let minutes = time.getMinutes();
    minutes < 10 ? minutes = `0${minutes}` : minutes
    
    const data = {
        id: purchaseID,
        cant,
        total,
        productos,
        hora: `${time.getHours()}:${minutes}`,
        fecha: time.toLocaleDateString()
    }
    
    // Adding
    compras.push( data );

    try {
        
        await Usuario.findByIdAndUpdate( id , { compras: compras });

        // Removing items from stock
        productos.map( async producto => {

            const { stock } = await Dulce.findById( producto._id );
            await Dulce.findByIdAndUpdate( producto._id, { stock : stock - producto.amount } )

        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Hubo un error al realizar la compra"
        })
    }

    res.json({
        ok: true,
        msg: "La compra ha sido exitosa",
        compras
    })

}

module.exports = {addPurchase};