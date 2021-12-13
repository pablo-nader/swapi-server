const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Specie = sequelize.define('Specie', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    classification: { type: DataTypes.STRING(50) },
    designation: { type: DataTypes.STRING(50) },
    average_height: { type: DataTypes.STRING(10) },
    skin_colors: { type: DataTypes.STRING(150) },
    hair_colors: { type: DataTypes.STRING(150) },
    eye_colors: { type: DataTypes.STRING(150) },
    average_lifespan: { type: DataTypes.STRING(10) },
    language: { type: DataTypes.STRING(50) },
    url: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
}, {
    timestamps: true,
    updatedAt: "edited",
    createdAt: "created",
    paranoid: true
});

module.exports = Specie;