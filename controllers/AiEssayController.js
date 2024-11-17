const { GoogleGenerativeAI } = require("@google/generative-ai");

const createAiEssay = async (req, res) => {
    
    try {
        
        if (!req.body.prompt) {
            return res.status(400).json({ message: "Prompt is required." });
        }
        
        const prompt = ` 3 repertórios  ${req.body.prompt}`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({model:"gemini-1.5-flash", 
            generationConfig: {
                "temperature": 0,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 400
            }, 
            safetySettings: [
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE"
            } ]});

        const result = await model.generateContent(prompt);
        
        res.status(200).json(result.response.text());
    } catch (error) {
        console.error("Error generating AI essay:", error.message);
        res.status(400).json({ message: "Error generating AI essay.", error: error.message });
    }

};

module.exports = {
    createAiEssay,
};
