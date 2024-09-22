const { Router } = require('express');

const { personasGet,
    PersonaByIdGet,
    personasComoGet,
    personaPost,
    personaDelete,
    personaPut,
} = require('../controllers/persona');


const router = Router();

router.get('/', personasGet);

router.get('/:id', PersonaByIdGet);

router.put('/:id', personaPut);

router.get('/como/:termino', personasComoGet);

router.post('/',personaPost);

router.delete('/:id', personaDelete);

module.exports = router;
