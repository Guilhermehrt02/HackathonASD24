const PotencialTheme = require("../models/PotencialThemesModel");

// Cria um novo tema
const createTheme = async (req, res) => {
    try {
        const theme = new PotencialTheme(req.body);
        await theme.save();
        res.status(201).json(theme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtém todos os temas
const getAllThemes = async (req, res) => {
    try {
        const themes = await PotencialTheme.find();
        res.status(200).json(themes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtém um tema por ID
const getThemeById = async (req, res) => {
    try {
        const { id } = req.params;
        const theme = await PotencialTheme.findOne({ id });
        if (!theme) return res.status(404).json({ message: "Tema não encontrado" });
        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualiza um tema
const updateTheme = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTheme = await PotencialTheme.findOneAndUpdate(
            { id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTheme) return res.status(404).json({ message: "Tema não encontrado" });
        res.status(200).json(updatedTheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Deleta um tema
const deleteTheme = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTheme = await PotencialTheme.findOneAndDelete({ id });
        if (!deletedTheme) return res.status(404).json({ message: "Tema não encontrado" });
        res.status(200).json({ message: "Tema deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTheme,
    getAllThemes,
    getThemeById,
    updateTheme,
    deleteTheme,
};
