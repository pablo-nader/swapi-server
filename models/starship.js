const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
    
const Starship = sequelize.define('Starship', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    model: { type: DataTypes.STRING(100) },
    manufacturer: { type: DataTypes.STRING(100) },
    cost_in_credits: { type: DataTypes.STRING(20) },
    length: { type: DataTypes.STRING(10) },
    max_atmosphering_speed: { type: DataTypes.STRING(10) },
    crew: { type: DataTypes.STRING(50) },
    passengers: { type: DataTypes.STRING(10) },
    cargo_capacity: { type: DataTypes.STRING(50) },
    consumables: { type: DataTypes.STRING(50) },
    hyperdrive_rating: { type: DataTypes.STRING(50) },
    MGLT: { type: DataTypes.STRING(50) },
    starship_class: { type: DataTypes.STRING(100) },
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

module.exports = Starship;