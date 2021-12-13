const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Film = sequelize.define('Film', {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    episode_id: { type: DataTypes.INTEGER },
    opening_crawl: { type: DataTypes.TEXT },
    director: { type: DataTypes.STRING(100) },
    producer: { type: DataTypes.STRING(100) },
    release_date: { type: DataTypes.DATEONLY },
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

module.exports = Film;