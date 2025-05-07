const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String,
  recetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receta' }],
  seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});
module.exports = mongoose.model('Usuario', usuarioSchema);