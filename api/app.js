// Importar los módulos necesarios
const express = require('express');
const homeRoutes = require('./routes/homeRouter.js');
const cors = require('cors');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor escuchará las solicitudes
const port = process.env.PORT || 5000;

var whitelist = ['http://127.0.0.1:5500', 'https://web.arzz.tech', 'http://localhost:5000' ];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback("Your request cannot be processed at this time due to security restrictions.");
    }
  }
}

// Middleware para analizar datos de solicitudes entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurar las rutas de la aplicación
app.use('/api', cors(corsOptions), homeRoutes);

// Ruta para redirigir a GitHub
app.get('/', (req, res) => {
  res.redirect('https://github.com/ArZz04');
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`La API está corriendo en el puerto: ${port}`);
});