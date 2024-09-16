const { response, request } = require('express');
const {bdmysql} =require('../database/MariaDbConnection')
const Persona = require("../models/persona")


const personasGet =  async (req, res) => { 

   const persona = await Persona.findAll();

   res.json({
    data: persona
   })
};


const  PersonaByIdGet = async (req = request, res = response) => {
    const { id } = req.params;

    try {

        const unaPersona = await Persona.findByPk(id);

        if (!unaPersona) {
            return res.status(404).json({ok: false, 
                msg: "does not ecst"
            })
        }
        
        res.json({
            ok:true,
            data:unaPersona})

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}

const personasComoGet = async (req = request, res = response) => {
    const { termino } = req.params;

    console.log("TERMINO", termino);

    try {
        const results = await bdmysql.query(
            "SELECT * FROM persona WHERE nombres LIKE ? OR apellidos LIKE ? ORDER BY nombres",
            {
                replacements: [`%${termino}%`, `%${termino}%`],
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



const personaPost = async (req, res = response) => {

    const { nombres, apellidos, fecha_nacimiento } = req.body;


    const datos = req.body;


    console.log("Datos", datos);


    const persona = new Persona({ nombres, apellidos, fecha_nacimiento });


    try {

        const newPersona = await persona.save();

        persona.id_persona = newPersona.null;

        res.json({
            ok: true,
            data: persona
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })


    }


}



const personaPut = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    console.log(id);
    console.log(body);

    try {

        const persona = await Persona.findByPk(id);

        if (!persona) {
            return res.status(404).json({ok:false,
                msg: 'No existe una Persona con el id: ' + id
            })
        }
       
        await persona.update(body);

        res.json({ok:true,data:persona});

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}




const personaDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);
 
    try {

        const persona = await Persona.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!persona) {
            return res.status(404).json({ok:false,
                msg: 'No existe una persona con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await persona.destroy();

        res.json({ok:true,
            persona:persona,
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
    personasGet, PersonaByIdGet, personasComoGet,personaPost,personaDelete,personaPut,
};
