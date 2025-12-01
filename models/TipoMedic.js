const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoMedic = sequelize.define('TipoMedic', {
  CodTipoMed: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'TipoMedic',
  timestamps: false
});


exports.getAllTipos = async (req, res) => {
  try {
    const tipos = await TipoMedic.findAll(); // Esto hace: SELECT * FROM TipoMedic
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = TipoMedic;