const { response, request } = require('express');
const {bdmysql} =require('../database/MariaDbConnection')
const Ciudad = require("../models/ciudad")


const ciudadesGet =  async (req, res) => { 
   const ciudad = await Ciudad.findAll();
   res.json({
    data: ciudad
   })
};


const  CiudadByIdGet = async (req = request, res = response) => {
    const { id } = req.params;

    try {

        const unaCiudad = await Ciudad.findByPk(id);

        if (!unaCiudad) {
            return res.json({ok: false, 
                msg: "ciudad no existe"
            })
        }
        
        res.json({
            ok:true,
            data:unaCiudad})

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}

const ciudadesComoGet = async (req = request, res = response) => {
    const { termino } = req.params;

    console.log("TERMINO", termino);

    try {
        const results = await bdmysql.query(
            "SELECT * FROM ciudad WHERE nombre LIKE ?",
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
        res.json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};



const ciudadPost = async (req, res = response) => {

    const { nombre } = req.body;


    const datos = req.body;


    console.log("Datos", datos);


    const ciudad = new Ciudad({ nombre });


    try {

        const newCiudad = await ciudad.save();

        ciudad.id_ciudad = newCiudad.null;

        res.json({
            ok: true,
            data: ciudad
        });


    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}



const ciudadPut = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    console.log(id);
    console.log(body);

    try {

        const ciudad = await Ciudad.findByPk(id);

        if (!ciudad) {
            return res.json({ok:false,
                msg: 'No existe una Ciudad con el id: ' + id
            })
        }
       
        await ciudad.update(body);

        res.json({ok:true,data:ciudad});

    } catch (error) {
        console.log(error);
        res.json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}

const ciudadDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);
 
    try {

        const ciudad = await Ciudad.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!ciudad) {
            return res.json({ok:false,
                msg: 'No existe una ciudad con el id: ' + id
            })
        }

        //Borrado de la BD
        await ciudad.destroy();

        res.json({ok:true,
            ciudad:ciudad,
            //autenticado:usuarioAutenticado
        });

    } catch (error) {
        console.log(error);
        res.json({ok:false,
            msg: 'Hable con el Administrador',
            error: error
        })
    }
}

module.exports = {
    ciudadesGet, CiudadByIdGet, ciudadesComoGet,ciudadPost,ciudadDelete,ciudadPut,
};
