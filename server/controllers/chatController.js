const asyncHandler = require("express-async-handler");

// @desc    Process chat message (Direct API Version)
// @route   POST /api/chat
// @access  Public
const chatWithAI = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  // 1. Check API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing in server environment variables!");
    res.status(500).json({ reply: "Server configuration error: API Key missing." });
    return;
  }

  try {
    // 2. Define the Model URL (Directly pointing to Flash)
    const apiVersion = "v1beta";
    const model = "gemini-1.5-flash"; 
    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

    // 3. Construct the Payload
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `
            You are the "SmartDiet AI Assistant". 
            Help users with nutrition, diet planning, and using this website.
            Keep answers short (under 50 words) and helpful.
            
            User Message: ${message}
          `}]
        }
      ]
    };

    // 4. Send Request (Using Native Node.js Fetch - No Libraries needed)
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // 5. Handle Errors from Google
    if (!response.ok) {
      console.error("🔥 Google API Error:", JSON.stringify(data, null, 2));
      
      // Fallback: If Flash fails, try the older Pro model automatically
      if (response.status === 404) {
         throw new Error("Model not found - trying fallback");
      }
      
      return res.status(500).json({ reply: "My brain is tired. Please try again." });
    }

    // 6. Extract Response
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ Chat Controller Error:", error.message);
    res.status(500).json({ reply: "I'm having trouble connecting to the AI right now." });
  }
});

module.exports = { chatWithAI };