const { Router } = require('express');
const { body, check } = require('express-validator');
const { addPurchase } = require('../controllers/compra.controller');
const { postUser, getUsers, updateUser } = require('../controllers/user.controller');
const { emailExists, isValidRole, idExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const route = Router();

route.post('/compra/:id', addPurchase );

route.post("/", [
    body("correo", "El correo no es válido").isEmail(),
    body("correo").custom( emailExists ),
    body("nombre").not().isEmpty(),
    body("password").not().isEmpty(),
    body("rol").custom(isValidRole),
    validateFields
], postUser)

route.put('/:id', [
    check('id').custom( idExists ),
    validateFields
], updateUser )

route.get('/', getUsers );

module.exports = route;