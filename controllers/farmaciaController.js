const Medicamento = require('../models/Medicamento');
const TipoMedic = require('../models/TipoMedic');

// Obtener todos los medicamentos junto con su tipo
exports.getAllMedicamentos = async (req, res) => {
  try {
    const lista = await Medicamento.findAll({
      include: [{ model: TipoMedic }] // JOIN con la tabla TipoMedic
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un medicamento
exports.createMedicamento = async (req, res) => {
  try {
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener tipos (Para llenar el combobox en el frontend)
exports.getAllTipos = async (req, res) => {
  try {
    const tipos = await TipoMedic.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};