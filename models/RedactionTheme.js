const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Sub-schema para os textos e parágrafos
const TextSchema = new Schema({
    source: { type: String, required: true },
    paragraphs: [
        {
            type: Schema.Types.Mixed, // Permite armazenar strings e objetos (para imagens)
        },
    ],
});

// Schema principal para o tema da redação
const RedactionThemeSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    exam: { type: String, required: true },
    year: { type: Number, required: true },
    mainSubject: { type: String, required: true },
    secondarySubject: { type: String },
    keywords: [{ type: String }], // Array de strings
    texts: [TextSchema], // Array de sub-documentos
});

// Exporta o modelo
const RedactionTheme = mongoose.model("RedactionTheme", RedactionThemeSchema);
module.exports = RedactionTheme;
