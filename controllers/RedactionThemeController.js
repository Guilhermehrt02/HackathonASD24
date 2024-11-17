const RedactionTheme = require("../models/RedactionTheme");

// Cria um novo tema de redação
exports.createTheme = async (req, res) => {
    try {
        const theme = new RedactionTheme(req.body);
        await theme.save();
        res.status(201).json(theme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lista todos os temas de redação
exports.getAllThemes = async (req, res) => {
    try {
        const themes = await RedactionTheme.find();
        res.status(200).json(themes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Busca um tema pelo ID
exports.getThemeById = async (req, res) => {
    try {
        const theme = await RedactionTheme.findOne({ id: req.params.id });
        if (!theme) return res.status(404).json({ message: "Tema não encontrado" });
        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualiza um tema pelo ID
exports.updateTheme = async (req, res) => {
    try {
        const theme = await RedactionTheme.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!theme) return res.status(404).json({ message: "Tema não encontrado" });
        res.status(200).json(theme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove um tema pelo ID
exports.deleteTheme = async (req, res) => {
    try {
        const theme = await RedactionTheme.findOneAndDelete({ id: req.params.id });
        if (!theme) return res.status(404).json({ message: "Tema não encontrado" });
        res.status(200).json({ message: "Tema removido com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
