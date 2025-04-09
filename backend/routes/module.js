const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Module = require("../models/module");

const router = express.Router();

// Create a new module
router.post("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { name, description, lessons, tags, difficulty, estimatedTime } =
    req.body;

  try {
    const newModule = new Module({
      name,
      description,
      lessons,
      tags,
      difficulty,
      estimatedTime,
      userId,
    });

    await newModule.save();
    res.status(201).json({ message: "Module created", module: newModule });
  } catch (err) {
    console.error("Error creating module:", err);
    res.status(500).json({ error: "Failed to create module." });
  }
});

// Get all modules created by the current user
router.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const modules = await Module.find({ userId }).populate(
      "lessons",
      "lessonHeading"
    );
    res.status(200).json({ modules });
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ error: "Failed to fetch modules." });
  }
});

module.exports = router;
