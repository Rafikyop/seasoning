const Recipe = require('../models/Recipe');

// Crear receta
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, author } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions, author });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear receta' });
  }
};

// Obtener todas las recetas
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
};

// Obtener una receta por ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener receta' });
  }
};

// Actualizar una receta
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: 'Receta no encontrada' });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar receta' });
  }
};

// Eliminar una receta
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Receta no encontrada' });
    res.status(200).json({ message: 'Receta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar receta' });
  }
};