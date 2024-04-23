const express = require('express');
const cors = require('cors');
const carrosController = require('./carrosController');

const app = express();

// Middleware para análise de JSON
app.use(express.json());

// Middleware para lidar com CORS
app.use(cors());

// Rotas
app.use('/api', carrosController);

// Porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
