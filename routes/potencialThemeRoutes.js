const express = require("express");
const router = express.Router();
const potencialThemeController = require("../controllers/PotencialThemeController");

// Rotas
router.post("/", potencialThemeController.createTheme); // Criação de um novo tema
router.get("/", potencialThemeController.getAllThemes); // Listar todos os temas
router.get("/:id", potencialThemeController.getThemeById); // Obter tema por ID
router.put("/:id", potencialThemeController.updateTheme); // Atualizar um tema por ID
router.delete("/:id", potencialThemeController.deleteTheme); // Deletar um tema por ID

module.exports = router;
