const { Sequelize, DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');

const Ciudades = bdmysql.define('ciudad', {
    'id_ciudad': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    'nombre': {
        type: DataTypes.STRING,
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

module.exports = Ciudades;
