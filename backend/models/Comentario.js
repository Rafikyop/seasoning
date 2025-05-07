const mongoose = require('mongoose');
const comentarioSchema = new mongoose.Schema({
  texto: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  receta: { type: mongoose.Schema.Types.ObjectId, ref: 'Receta' }
});
module.exports = mongoose.model('Comentario', comentarioSchema);