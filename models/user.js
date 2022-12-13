 
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required : [true, 'El correo es obligatorio'],
        unique : true
    },
    compras: {
        type: Array,
        default: []
    },
    password : {
        type: String,
        required : [true, 'La contraseña es obligatoria'],
    },
    img : {
        type: String,
        default: "https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-caramelo-paleta_138676-2642.jpg?w=740&t=st=1670703871~exp=1670704471~hmac=9a08d93486992f98309e7b0b8e2267728d19fb611cb5bce0d17de1c84ce68806"
    },
    rol : {
        type: String,
        required : true,
        enum : [ "ADMIN_ROLE" , "USER_ROLE" ]
    },
    estado : {
        type: Boolean,
        default : true
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();

    return user;
}

module.exports = model( 'Usuario', UsuarioSchema );