const express = require("express");
const generateLesson = require("../services/generateLesson");

const router = express.Router();

router.post("/lesson", async (req, res) => {
  const { topic } = req.body;
  try {
    const lesson = await generateLesson(topic);
    res.status(200).json({ lessonPlan: lesson });
  } catch (err) {
    console.error("Error generating lesson:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to generate lesson." });
  }
});

module.exports = router;
