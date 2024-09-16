const { response, request } = require('express');
const {bdmysql} =require('../database/MariaDbConnection');
const Usuario = require("../models/usuario");
const Persona =require("../models/persona");

const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');

const usuariosGet =  async (req, res) => { 

   const usuario = await Usuario.findAll();

   res.json({
    ok:true,
    data: usuario
   })
};

const  UsuarioByIdGet = async (req = request, res = response) => {
    const { id } = req.params;
   
    try {

        const unUsuario = await Usuario.findByPk(id);
        if (!unUsuario) {
            return res.status(404).json({ok: false, 
                msg: "does not ecst"
            })
        }
        
        res.json({
            ok:true,
            data:unUsuario})
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}

// todo convert get to post method, and configure the response message
const  UsuarioContrasena = async (req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;
   
    try {

        const unUsuario = await Usuario.findByPk(id);
        if (!unUsuario) {
            return res.status(404).json({ok: false, 
                msg: "does not ecst"
            })
        }

        contrasenaI = body.contraseña
        console.log(contrasenaI)
        validacion= await bcrypt.compare(contrasenaI, unUsuario.contraseña);
        console.log(unUsuario.contraseña)

        console.log(validacion)

        if (!validacion) {
            return res.status(404).json({ok: false, 
                msg: "la contraseña es incorrecta"
            })
        }
        
        res.json({
            ok:true,msj:"La contraseña es correcta"})
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}


const usuariosComoGet = async (req = request, res = response) => {
    const { termino } = req.params;

    console.log("TERMINO", termino);

    try {
        const results = await bdmysql.query(
            "SELECT * FROM usuario WHERE email LIKE ? ",
            {
                replacements: [`%${termino}%`],
                type: bdmysql.QueryTypes.SELECT
            }
        );

        res.json({
            ok: true,
            data: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const loginPost = async(req,res=response)=>{
    const { email,contraseña } = req.body;
    
    try{
    var condicion = {where : {email:email}} 
    const usuario = await Usuario.findOne(condicion);
    if(!usuario){
    return res.status(400).json({ok:false,msg: "Usuario no encontrado con el email ingresado" + correo})
    }
    const validaPassword = bcrypt.compare(contraseña,usuario.contraseña);
    if(!validaPassword){
        return res.status(400).json({ok:false,msg: "Password incorrecto con el email ingresado" + contraseña})
    }
    const token = await generarJWT(usuario.id_usuario);

    res.json({
        ok:true,msj:"Login OK",token
    })

 } catch (error) {
    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
 }
}

const usuarioPost = async (req, res) => {
    const { contraseña, email, numero_telefono, minibiografia, id_persona } = req.body;

    try {
        const personaExiste = await Persona.findByPk(id_persona);

        if (!personaExiste) {
            return res.status(404).json({ok: false, 
                msg: "does not ecst"
            })
        }

        const usuario = new Usuario({ contraseña, email, numero_telefono,minibiografia, id_persona });

        const salt = await bcrypt.genSalt();

        console.log(salt);
        
        contraseñaHash = await bcrypt.hash(contraseña,salt)
        console.log(contraseñaHash);
        
        usuario.contraseña = contraseñaHash;
        
        console.log(usuario.contraseña);
        const newUsuario = await usuario.save();

        usuario.id_usuario = newUsuario.id_usuario;

        res.json({
            ok: true,
            msj: "Usuario creado"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message
        });
    }
};

const usuarioPut = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ok:false,
                msg: 'No existe un Usuario con el id: ' + id
            })
        }

        delete body.id_persona;

        const salt = await bcrypt.genSalt();

        contraseñaHash = await bcrypt.hash(body.contraseña,salt);

        body.contraseña = contraseñaHash;

        await usuario.update(body);

        res.json({ok:true,msj:"Datos actualizados"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}

const usuarioDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);
 
    try {

        const usuario = await Usuario.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!usuario) {
            return res.status(404).json({ok:false,
                msg: 'No existe una usuario con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await usuario.destroy();

        res.json({ok:true,
            msj:"Registro eliminado correctamente",
            //autenticado:usuarioAutenticado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}

module.exports = {
    usuariosGet, UsuarioByIdGet, usuariosComoGet,usuarioPost,usuarioDelete,usuarioPut,UsuarioContrasena,loginPost
};
