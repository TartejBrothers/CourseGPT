const express = require("express");
const generateLesson = require("../services/generateLesson");
const Lesson = require("../models/ai");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.post("/lesson", verifyToken, async (req, res) => {
  const { topic } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId not found in token" });
  }

  try {
    const lesson = await generateLesson(topic);

    const match = lesson.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const heading = match ? match[1] : topic;

    const lessonData = {
      lessonData: lesson,
      lessonHeading: heading,
      userId,
    };

    const lessonEntry = new Lesson(lessonData);
    await lessonEntry.save();

    res.status(200).json({ lessonPlan: lesson });
  } catch (err) {
    console.error("Error generating lesson:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to generate lesson." });
  }
});

router.get("/lesson", verifyToken, async (req, res) => {
  const userId = req.userId; // from token

  if (!userId) {
    return res.status(400).json({ error: "userId not found in token" });
  }

  try {
    const lessons = await Lesson.find({ userId });
    res.status(200).json({ lessons });
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: err.message || "Failed to fetch lessons." });
  }
});

module.exports = router;
