require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em `)
})