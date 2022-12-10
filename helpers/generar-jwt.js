const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, "Th1s1sm7p31v473k37", ( err, token ) => {

            if ( err ) {
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }

        })

    })
}

module.exports = {
    generarJWT,
}