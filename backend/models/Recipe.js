const mongoose = require('mongoose');
const recetaSchema = new mongoose.Schema({
  titulo: String,
  ingredientes: [String],
  pasos: [String],
  usuarioCreador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }]
});
module.exports = mongoose.model('Receta', recetaSchema);