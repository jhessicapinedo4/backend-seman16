const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const farmaciaController = require('./controllers/farmaciaController');

const app = express();
app.use(cors());
app.use(express.json());

// Puerto dinámico para Render (o 4000 en local)
const PORT = process.env.PORT || 4000;

// Rutas
const router = express.Router();
router.get('/medicamentos', farmaciaController.getAllMedicamentos);
router.post('/medicamentos', farmaciaController.createMedicamento);
router.get('/tipos', farmaciaController.getAllTipos);

app.use('/api', router);

// Sincronizar BD y arrancar servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas con bd_Farmacia');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar con la base de datos:', error);
  });
