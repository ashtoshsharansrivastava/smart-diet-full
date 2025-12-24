const asyncHandler = require("express-async-handler");

// @desc    Process chat message (Self-Healing Version)
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

  // 🤖 List of models to try (in order of preference)
  // If "Flash" fails, it tries "1.0 Pro", then "Legacy Pro"
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.0-pro", "gemini-pro"];
  
  let botReply = "";
  let success = false;
  let lastError = "";

  // 🔄 Loop through models until one works
  for (const model of modelsToTry) {
    try {
      console.log(`🤖 Attempting to connect with model: ${model}...`);
      
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

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        // If 404 (Not Found), it means this model isn't available for your key.
        // We throw an error to trigger the next loop iteration.
        throw new Error(`Google API Error (${model}): ${data.error?.message || response.statusText}`);
      }

      // If we get here, it worked!
      botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      success = true;
      console.log(`✅ Success! Connected using ${model}`);
      break; // Stop the loop

    } catch (error) {
      console.error(`❌ Failed with ${model}:`, error.message);
      lastError = error.message;
      // Loop continues to the next model...
    }
  }

  if (success) {
    res.json({ reply: botReply });
  } else {
    // If all models failed
    console.error("🔥 All models failed.");
    res.status(500).json({ reply: "I am having trouble connecting. Please check your API Key permissions." });
  }
});

module.exports = { chatWithAI };