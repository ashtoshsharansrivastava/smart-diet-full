const asyncHandler = require("express-async-handler");

// @desc    Process chat message (Experimental Version)
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
    console.error("❌ API Key Missing");
    return res.status(500).json({ reply: "Server Config Error: API Key Missing" });
  }

  try {
    // 👇 UPDATED: "exp" models usually have open Free Tier quotas
    const model = "gemini-2.0-flash-exp";
    
    // API Version: v1beta
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

    // Send Request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Handle Errors
    if (!response.ok) {
      console.error("🔥 Google API Error:", JSON.stringify(data, null, 2));
      
      // If 429 (Quota), return a friendly message
      if (response.status === 429) {
        return res.status(429).json({ reply: "I'm receiving too many requests right now. Please try again in 30 seconds." });
      }

      return res.status(500).json({ 
        reply: "I am having trouble connecting to the AI. Please try again." 
      });
    }

    // Success
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ Controller Crash:", error.message);
    res.status(500).json({ reply: "Internal Server Error." });
  }
});

module.exports = { chatWithAI };