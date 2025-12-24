// server/list-models.js
const apiKey = "AIzaSyCueyZaXO0JgFV2Xg2wxVe-nKTj6EyIr9s"; 

async function listModels() {
  console.log("🔍 Asking Google for available models...");
  
  // This URL asks for the list of ALL models your key can access
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.log("❌ API Key Error:", JSON.stringify(data, null, 2));
      return;
    }

    console.log("✅ API Key Works! Here are your available models:");
    console.log("------------------------------------------------");
    
    // Filter only models that support "generateContent" (Chat)
    const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
    
    chatModels.forEach(model => {
      console.log(`🌟 Name: ${model.name}`);
      console.log(`   Version: ${model.version}`);
    });
    
    if (chatModels.length === 0) {
      console.log("⚠️ No chat models found. You might need to enable the API in Google Console.");
    }

  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

listModels();