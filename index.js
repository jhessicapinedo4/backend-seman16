const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const farmaciaController = require('./controllers/farmaciaController');
const productosRoutes = require('./routes/productosRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de medicamentos
const router = express.Router();
router.get('/medicamentos', farmaciaController.getAllMedicamentos);
router.post('/medicamentos', farmaciaController.createMedicamento);
router.get('/tipos', farmaciaController.getAllTipos);

// Rutas de productos
app.use('/api/productos', productosRoutes);
app.use('/api', router);

// Sincronizar BD y arrancar
// 'force: false' evita borrar los datos si reinicias
sequelize.sync({ force: false }).then(() => {
  console.log('Tablas sincronizadas con bd_Farmacia');
  const server = app.listen(4000, () => {
    console.log('Backend corriendo en http://localhost:4000');
  });
  server.on('close', () => console.log('Servidor cerrado'));
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});








// // index.js

// const express = require('express');
// const cors = require('cors');
// const productosRoutes = require('./routes/productosRoutes');
// const sequelize = require('./db');

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/productos', productosRoutes);

// sequelize.sync()
//     .then(() => {
//         console.log('Base de datos sincronizada');
//         app.listen(3001, () => {
//             console.log('Backend corriendo en http://localhost:3001');
//         });
//     })
//     .catch(err => {
//         console.error('Error al sincronizar base de datos:', err);
//     });

