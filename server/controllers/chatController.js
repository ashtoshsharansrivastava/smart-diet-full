const asyncHandler = require("express-async-handler");

// @desc    Process chat message (Stable Version)
// @route   POST /api/chat
// @access  Public
const chatWithAI = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  // 1. Get API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ API Key Missing");
    return res.status(500).json({ reply: "Server Config Error: API Key Missing" });
  }

  try {
    // 👇 FORCE STANDARD MODEL (No "Flash", No "1.5")
    const model = "gemini-pro";
    
    // Direct URL to Google API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: `
          You are the "SmartDiet AI Assistant". 
          Help users with nutrition and diet planning.
          Keep answers short (under 50 words).
          
          User Message: ${message}
        `}]
      }]
    };

    // 2. Send Request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // 3. Handle Errors
    if (!response.ok) {
      console.error("🔥 Google API Error:", JSON.stringify(data, null, 2));
      return res.status(500).json({ 
        reply: "I am having trouble connecting to the AI. Please try again." 
      });
    }

    // 4. Send Success Response
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ Controller Crash:", error.message);
    res.status(500).json({ reply: "Internal Server Error." });
  }
});

module.exports = { chatWithAI };