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

// Basic Validation
if (!process.env.MONGO_DB_URI) {
  console.error("❌ Missing MONGO_DB_URI in .env");
  process.exit(1);
}

// Create the Mongo client
const client = new MongoClient(process.env.MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db, Courses;

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Select database + collection from .env
    db = client.db(process.env.MONGO_DB_COLLECTION);
    Courses = db.collection(process.env.COURSES);

    // Route: get all courses
    app.get("/course-explorer", async (_req, res) => {
      try {
        const docs = await Courses.find({}).toArray();
        res.json(docs);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        res.status(500).json({ error: err.message });
      }
    });

    // Start the server *only after DB is ready*
    app.listen(3001, () => {
      console.log("✅ Backend running on http://localhost:3001");
    });
  } catch (err) {
    console.error("❌ Mongo connect error:", err);
    process.exit(1);
  }
})();

// Endpoint: AI content generation
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
