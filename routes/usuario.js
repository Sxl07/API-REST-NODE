const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt')

const { usuariosGet,
    UsuarioByIdGet,
    usuariosComoGet,
    usuarioPost,
    usuarioDelete,
    usuarioPut,
    UsuarioContrasena,
    loginPost,
} = require('../controllers/usuario');


const router = Router();

router.get('/', usuariosGet);

router.get('/:id' ,UsuarioByIdGet);

router.get('/verificar/:id', UsuarioContrasena);

router.get('/como/:termino', usuariosComoGet);

router.post('/login', loginPost);

router.post('/',usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/:id', usuarioDelete);

module.exports = router;
