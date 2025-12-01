const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const TipoMedic = require('./TipoMedic');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATEONLY, // Solo fecha, sin hora
    allowNull: true
  },
  fechaVencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  Presentacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioVentaPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  Marca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // CodEspec lo dejaremos como entero simple ya que solo pidieron relacionar 2 tablas
  CodEspec: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // La llave foránea hacia TipoMedic
  CodTipoMed: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoMedic,
      key: 'CodTipoMed'
    }
  }
}, {
  tableName: 'Medicamento',
  timestamps: false
});

// Definir la relación (Asociación)
TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed' });
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed' });

module.exports = Medicamento;