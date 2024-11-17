const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const createAiEssay = async (req, res) => {
    
    try {
        
        if (!req.body.prompt) {
            return res.status(400).json({ message: "Prompt is required." });
        }
        console.log(req.body.prompt);
        
        const { prompt } = `Retorne (apenas em JSON, com um ID para cada) 3 repertórios históricos, culturais e/ou sociais, 
                            de 3 teses(linhas de pensamento) que podem ser utilizados em uma redação sobre ${req.body.prompt}, 
                            incluindo exemplos de autores, movimentos e leis. Mostre a partir de uma lista, com descrição, 
                            uma explicação breve de cada, com sem dicas, comentários ou observações da IA. 
                            Com mais uma categoria chamada "Estudos complementares", 
                            com recomendações de estudos que auxiliariam o aluno sobre o mesmo tema. Sempre no formato JSON.`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        res.status(200).json(result.response.text());
    } catch (error) {
        console.error("Error generating AI essay:", error.message);
        res.status(400).json({ message: "Error generating AI essay.", error: error.message });
    }

};

module.exports = {
    createAiEssay,
};
