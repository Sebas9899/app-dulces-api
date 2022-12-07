const { Schema, model } = require('mongoose');

const DulceSchema = Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    descripcion: {
        type: String,
    },
    precio : {
        type: Number,
        required : [true, 'El precio es obligatorio'],
    },
    img : {
        type: String,
        default: "https://img.freepik.com/free-vector/chocolate-bar-cartoon-icon-illustration_138676-1965.jpg?w=740&t=st=1670377119~exp=1670377719~hmac=85beea2b47b088d65a77343764946a9138c8af6224e6d339d907fd21a45f284c"
    },
    estado : {
        type: Boolean,
        default : true
    }
});

module.exports = model( 'Dulce', DulceSchema );