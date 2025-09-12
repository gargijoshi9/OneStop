// server/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Load keys from .env
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// Don't add mongo db

// Endpoint to handle content generation requests
app.post("/generate-content", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
    });

    res.json({
      reply:
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No reply received",
    });
  } catch (error) {
    console.error("❌ Backend error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(3001, () => {
  console.log("✅ Backend running on http://localhost:3001");
});
