const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Planet = sequelize.define('Planet', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    rotation: { type: DataTypes.STRING(50) },
    orbital_period: { type: DataTypes.STRING(50) },
    diameter: { type: DataTypes.STRING(50) },
    climate: { type: DataTypes.STRING(100) },
    gravity: { type: DataTypes.STRING(100) },
    terrain: { type: DataTypes.STRING(100) },
    surface_water: { type: DataTypes.STRING(20) },
    population: { type: DataTypes.STRING(20) },
}, {
    timestamps: true,
    updatedAt: "edited",
    createdAt: "created",
    paranoid: true
});

module.exports = Planet;