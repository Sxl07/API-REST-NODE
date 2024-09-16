const { Sequelize, DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');

const Personas = bdmysql.define('persona', {
    'id_persona': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    'nombres': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'apellidos': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'fecha_nacimiento': {
        type: DataTypes.DATE,
        allowNull: false
    },
},

{
    //Maintain table name don't plurilize
    freezeTableName: true,

    // I don't want createdAt
    createdAt: false,

    // I don't want updatedAt
    updatedAt: false
    }

);

module.exports = Personas;
