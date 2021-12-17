const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: { 
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    updatedAt: "edited",
    createdAt: "created",
    paranoid: true
});

module.exports = User;