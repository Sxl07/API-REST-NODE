const { Router } = require('express');

const { ciudadesGet,
    CiudadByIdGet,
    ciudadesComoGet,
    ciudadPost,
    ciudadDelete,
    ciudadPut,
} = require('../controllers/ciudad');


const router = Router();

router.get('/', ciudadesGet);

router.get('/:id', CiudadByIdGet);

router.put('/:id', ciudadPut);

router.get('/como/:termino', ciudadesComoGet);

router.post('/',ciudadPost);

router.delete('/:id', ciudadDelete);

module.exports = router;
