const express = require("express");
const router = express.Router();
const RedactionThemeController = require("../controllers/RedactionThemeController");

// Rota para criar um tema
router.post("/", RedactionThemeController.createTheme);

// Rota para listar todos os temas
router.get("/", RedactionThemeController.getAllThemes);

// Rota para buscar um tema pelo ID
router.get("/:id", RedactionThemeController.getThemeById);

// Rota para atualizar um tema pelo ID
router.put("/:id", RedactionThemeController.updateTheme);

// Rota para remover um tema pelo ID
router.delete("/:id", RedactionThemeController.deleteTheme);

module.exports = router;
