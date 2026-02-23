const axios = require("axios");

exports.getWasteDetails = async (req, res) => {
  const { wasteType } = req.body;

  if (!wasteType) {
    return res.status(400).json({ error: "wasteType is required" });
  }

  const prompt = `
You are an API. Respond ONLY with valid JSON.

Waste type: ${wasteType}

Return JSON in this exact structure:
{
  "description": "",
  "industries": [],
  "uses": [],
  "recyclingSteps": [
    { "step": "", "tip": "" }
  ],
  "ecoTip": ""
}
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Return only JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    // Safe JSON extraction
    const json = JSON.parse(
      text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );

    res.json(json);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Groq AI failed" });
  }
};
