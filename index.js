const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users');
const RedactionThemeRoutes = require('./routes/redactionThemeRoutes');

dotenv.config();
const app = express();
const port = 3000;

// Conexão com o banco de dados
connectDB();

// Middleware
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/redaction-themes', RedactionThemeRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
