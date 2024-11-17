const express = require("express");
const router = express.Router();
const aiEssayController = require("../controllers/AiEssayController");

// Rotas
router.post("/", aiEssayController.createAiEssay);

module.exports = router;
