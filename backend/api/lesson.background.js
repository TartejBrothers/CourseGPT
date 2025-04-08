const generateLesson = require("../services/generateLesson");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic } = req.body;
    const lesson = await generateLesson(topic);
    res.status(200).json({ lessonPlan: lesson });
  } catch (err) {
    console.error("Error generating lesson:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to generate lesson." });
  }
};
