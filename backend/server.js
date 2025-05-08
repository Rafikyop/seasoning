const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Ruta de autenticación
const recipeRoutes = require('./routes/recipeRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/seasoning');

// Middleware
app.use(cors());
app.use(express.json());  // Para que el servidor pueda manejar JSON en las solicitudes

// Rutas de autenticación
app.use('/api/auth', authRoutes);  // Rutas de autenticación en /api/auth

// Rutas protegidas (ejemplo)
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso autorizado', user: req.user });
});

// Middleware de autenticación JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];  // 'Bearer token'

  if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;  // El payload del JWT se adjunta a la solicitud
    next();
  });
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware de rutas
app.use('/api/recipes', recipeRoutes);  // rutas CRUD de recetas
app.use('/api/users', authRoutes);  // rutas de login/registro