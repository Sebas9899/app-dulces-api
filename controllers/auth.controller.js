const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');

const login = async ( req, res = response ) => {

    const { correo, password } = req.body;
    try {
        
        // Email exists
        const userExists = await Usuario.findOne({ correo });
        if ( !userExists ) {
            return res.status(400).json({
                msg: 'Las credenciales no son correctas',
                ok: false
            })
        }
        
        // Password is correct
        const validPassword = bcryptjs.compareSync( password, userExists.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Las credenciales no son correctas',
                ok: false
            })
        }

        // User is active
        if ( !userExists.estado ) {
            return res.status(400).json({
                msg: 'El usuarios se encuentra inactivo',
                ok: false
            })
        }

        // Generate JWT
        const token = await generarJWT( userExists._id );

        res.json({
            msg: 'Inicio exitoso',
            ok: true,
            user: userExists,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: error,
            ok: false
        })
        
    }

}
module.exports = {
    login,
}