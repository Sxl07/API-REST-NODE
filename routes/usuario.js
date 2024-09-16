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

router.get('/',validarJWT, usuariosGet);

router.get('/:id',validarJWT ,UsuarioByIdGet);

router.get('/verificar/:id',validarJWT, UsuarioContrasena);

router.get('/como/:termino', validarJWT,usuariosComoGet);

router.post('/login', loginPost);

router.post('/',validarJWT,usuarioPost);

router.put('/:id', validarJWT,usuarioPut);

router.delete('/:id', validarJWT, usuarioDelete);

module.exports = router;
