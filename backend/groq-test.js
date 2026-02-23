import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testGroq() {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", // ✅ REAL, SUPPORTED MODEL
        messages: [
          {
            role: "system",
            content: "You respond ONLY with valid JSON."
          },
          {
            role: "user",
            content: '{"status":"ok"}'
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Groq response:");
    console.log(response.data.choices[0].message.content);

  } catch (err) {
    console.error(
      "Groq error:",
      err.response?.data || err.message
    );
  }
}

testGroq();
