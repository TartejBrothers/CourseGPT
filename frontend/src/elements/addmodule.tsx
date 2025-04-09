import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/popup.css";

interface Lesson {
  _id: string;
  lessonHeading: string;
}

interface AddModuleProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddModule: React.FC<AddModuleProps> = ({ isVisible, onClose }) => {
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLessons, setSelectedLessons] = useState<Lesson[]>([]);
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [completionTime, setCompletionTime] = useState("");
  const Base_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(`${Base_URL}/api/ai/lesson`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setAvailableLessons(res.data.lessons || []);
      } catch (err) {
        console.error("Failed to fetch lessons", err);
      }
    };
    fetchLessons();
  }, []);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    const selected = availableLessons.find((l) => l._id === lessonId);
    if (selected) {
      setSelectedLessons((prev) => [...prev, selected]);
      setAvailableLessons((prev) => prev.filter((l) => l._id !== lessonId));
    }
  };

  const handleRemoveLesson = (lessonId: string) => {
    const toRemove = selectedLessons.find((l) => l._id === lessonId);
    if (toRemove) {
      setAvailableLessons((prev) => [...prev, toRemove]);
      setSelectedLessons((prev) => prev.filter((l) => l._id !== lessonId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: moduleName,
      description,
      lessons: selectedLessons.map((l) => l._id),
      tags,
      difficulty,
      estimatedTime: completionTime,
    };

    try {
      await axios.post(`${Base_URL}/api/module`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      onClose();
    } catch (err) {
      console.error("Failed to create module", err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content bg-white p-6 rounded-2xl w-[90vw] max-w-xl shadow-xl max-h-[80vh] overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create Module</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded-lg"
            placeholder="Module Name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Module Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div>
            <label className="block mb-1 font-medium">Selected Lessons:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedLessons.map((lesson) => (
                <span
                  key={lesson._id}
                  className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {lesson.lessonHeading}
                  <button
                    type="button"
                    className="ml-1 text-white hover:text-gray-300"
                    onClick={() => handleRemoveLesson(lesson._id)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <select
              className="w-full p-2 border rounded-lg"
              onChange={(e) => handleLessonSelect(e.target.value)}
              defaultValue=""
            >
              <option value="">Select a lesson to add</option>
              {availableLessons.map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.lessonHeading}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Module Tags:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-black text-white px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Add tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
          </div>

          <select
            className="w-full p-2 border rounded-lg"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input
            className="w-full p-2 border rounded-lg"
            placeholder="Estimated Completion Time (e.g., 3 hours)"
            value={completionTime}
            onChange={(e) => setCompletionTime(e.target.value)}
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full"
          >
            Save Module
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModule;
