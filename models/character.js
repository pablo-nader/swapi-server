const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Character = sequelize.define('Character', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: { type: DataTypes.TEXT },
    height: { type: DataTypes.STRING(10) },
    mass: { type: DataTypes.STRING(10) },
    hair_color: { type: DataTypes.STRING(150) },
    skin_color: { type: DataTypes.STRING(150) },
    eye_color: { type: DataTypes.STRING(150) },
    birth_year: { type: DataTypes.STRING(50) },
    gender: { type: DataTypes.STRING(20) },
    url: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    }
}, {
    timestamps: true,
    updatedAt: "edited",
    createdAt: "created",
    paranoid: true
});

module.exports = Character;