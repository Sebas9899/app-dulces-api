const { Router } = require('express');
const { getDulces, postDulce, putDulce, deleteDulce } = require('../controllers/dulce.controller');

const route = Router();

route.get('/', getDulces);

route.post('/', postDulce);

route.put('/:id', putDulce);

route.delete('/:id', deleteDulce);

module.exports = route;