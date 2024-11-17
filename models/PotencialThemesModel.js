const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TextSchema = new Schema({
    source: { type: String },
    paragraphs: [
        {
            type: Schema.Types.Mixed, // Permite armazenar strings e objetos (para imagens)
        },
    ],
});

// Schema principal para o tema da redação
const PotencialThemeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    exam: { type: String, required: true },
    mainSubject: { type: String },
    secondarySubject: { type: String },
    keywords: [{ type: String }], // Array de strings
    texts: [TextSchema], // Array de sub-documentos
});

// Exporta o modelo
const PotencialTheme = mongoose.model("PotencialTheme", PotencialThemeSchema);
module.exports = PotencialTheme;
