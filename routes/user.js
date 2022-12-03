const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExists, idExists } = require('../helpers/db-validators');



// CONTROLLERS
const { getFastfood, 
        postLastname, 
        postUser,
        updateUser,
        deleteUser,
        getUsers

    } = require('../controllers/user.controller');

const router = Router();



 // ------------------------------------------ //
// ----------------- CREATE ----------------- //
router.post('/create',[
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'correo', 'El correo no es válido').isEmail(),
    check( 'correo' ).custom( emailExists ),
    check( 'password', 'El password debe ser mayor a 6 caracteres').isLength({ min : 6}),
    // check( 'rol', 'No es un rol permitido').isIn(["ADMIN_ROLE","USER_ROLE"]),
    check( 'rol' ).custom( isValidRole ),
    validateFields
], postUser );

 // ------------------------------------------ //
// ------------------ READ ------------------ //
router.get('/allUsers', getUsers)

 // ------------------------------------------ //
// ----------------- UPDATE ----------------- //
router.put('/update/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( idExists ),
    check( 'rol' ).custom( isValidRole ),
    validateFields
], updateUser );

 // ------------------------------------------ //
// ----------------- DELETE ----------------- //
router.delete('/delete/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( idExists ),
    validateFields
], deleteUser );





module.exports = router;