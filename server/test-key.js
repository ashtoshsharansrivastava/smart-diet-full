// server/test-key.js
const apiKey = "AIzaSyCueyZaXO0JgFV2Xg2wxVe-nKTj6EyIr9s"; // 👈 Paste your generic-key from AI Studio here

async function testGemini() {
  console.log("----------------------------------------");
  console.log("🧪 Testing API Key...");
  
  const model = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      role: "user",
      parts: [{ text: "Say 'Hello' if you can hear me." }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ SUCCESS! The Key is working.");
      console.log("🤖 AI Replied:", data.candidates[0].content.parts[0].text);
    } else {
      console.log("❌ FAILED. Google rejected the key.");
      console.log("🔥 Error Details:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

testGemini();