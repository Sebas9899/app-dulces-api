const { response } = require('express');

const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user');

 // ------------------------------------------ //
// ----------------- CREATE ----------------- //
const postUser = async ( req , res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptación de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password , salt );


    // Save BD
    await usuario.save();

    res.json({
        ok: true,
        usuario
    })
    
};

 // ------------------------------------------ //
// ------------------ READ ------------------ //
const getUsers = async ( req , res = response ) => {

    const state = { estado : true }
    

    const [ total , users ] = await Promise.all([
        Usuario.countDocuments(state),
        Usuario.find(state)
    ])

    res.json({ 
        total,
        users
    })

};

 // ------------------------------------------ //
// ----------------- UPDATE ----------------- //
const updateUser = async ( req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password , salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({ usuario })

}

 // ------------------------------------------ //
// ----------------- DELETE ----------------- //
const deleteUser = async ( req, res = response ) => {

    const { id } = req.params;

    // Eliminación total
    // const user = await Usuario.findByIdAndDelete( id );

    const user = await Usuario.findByIdAndUpdate( id, { estado : false})

    res.json( user )
}



module.exports = {
    getUsers,
    deleteUser,
    postUser,
    updateUser,
}