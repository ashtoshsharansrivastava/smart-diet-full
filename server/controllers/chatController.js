const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("express-async-handler");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Process chat message
// @route   POST /api/chat
// @access  Public
const chatWithAI = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  try {
    // 1. Configure the Model
  // 👇 UPDATED MODEL NAME
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Define the "Persona" (System Instruction)
    // This tells the AI how to behave.
    const systemPrompt = `
      You are the "SmartDiet AI Assistant". 
      Your goal is to help users with nutrition, diet planning, and navigating this website.
      
      Website Context:
      - "Find Expert": Users can search for verified dietitians.
      - "Dashboard": Users can generate AI diet plans based on BMI.
      - "Pricing": We have a Pro plan for ₹499/month.
      
      Rules:
      - Keep answers short, encouraging, and helpful.
      - If asked about medical advice, clarify you are an AI and they should consult a doctor (or use our Find Expert page).
      - Do not answer questions unrelated to health, diet, fitness, or this website.
      
      User Message: ${message}
    `;

    // 3. Generate Content
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting to my brain right now. Please try again later." });
  }
});

module.exports = { chatWithAI };