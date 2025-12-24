const asyncHandler = require("express-async-handler");

// @desc    Process chat message (Bulletproof Version)
// @route   POST /api/chat
// @access  Public
const chatWithAI = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ reply: "Server Error: API Key missing." });
  }

  try {
    // 👇 CHANGED: We use the standard 'gemini-pro' which works for everyone
    const model = "gemini-pro"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: `
          You are the "SmartDiet AI Assistant". 
          Help users with nutrition, diet planning, and using this website.
          Keep answers short (under 50 words) and helpful.
          
          User Message: ${message}
        `}]
      }]
    };

    // Send Request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Error Handling
    if (!response.ok) {
      console.error("🔥 Google API Error:", JSON.stringify(data, null, 2));
      return res.status(500).json({ 
        reply: "I am currently overloaded. Please try again in a moment." 
      });
    }

    // Success
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    res.status(500).json({ reply: "Connection error. Please try again." });
  }
});

module.exports = { chatWithAI };