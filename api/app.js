const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const homeRoutes = require('./routes/homeRouter.js');
app.use('/api', homeRoutes);


app.get('/', (req, res) => {
  res.redirect('https://github.com/ArZz04')
})

app.listen(port, () => {
  console.log(`La API esta corriendo en el puerto: ${port}`)
});