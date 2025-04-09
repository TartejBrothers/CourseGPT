const express = require("express");
const generateLesson = require("../services/generateLesson");
const Lesson = require("../models/ai");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.post("/lesson", async (req, res) => {
  const { topic, userId } = req.body;

  try {
    const lesson = await generateLesson(topic);

    const match = lesson.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const heading = match ? match[1] : topic;

    const lessonData = {
      lessonData: lesson,
      lessonHeading: heading,
      userId: userId,
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

module.exports = router;
