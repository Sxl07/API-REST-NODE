const { Sequelize, DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');

const Usuarios = bdmysql.define('usuario', {
    'id_usuario': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    'contraseña': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'email': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'numero_telefono': {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    'minibiografia': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'id_persona': {
        type: DataTypes.INTEGER,
        allowNull: false,
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

module.exports = Usuarios;
