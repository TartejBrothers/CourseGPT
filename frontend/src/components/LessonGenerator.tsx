import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  ArrowPathIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import type { Lesson } from "../types";
import axios from "axios";
import "../styles/response.css";
import ModuleList from "../elements/modulelist";
import Cookies from "js-cookie";
export default function LessonGenerator() {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cleanedHTML, setCleanedHTML] = useState<string | null>(null);
  function cleanHtmlString(raw: string) {
    return raw
      .replace(/^```html\s*/, "") // Remove ```html from the beginning
      .replace(/```$/, "") // Remove ``` from the end
      .replace(/\n/g, ""); // Remove all newline characters
  }
  const Base_URL = import.meta.env.VITE_BASE_URL;
  const handleGenerateLesson = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post(
        `${Base_URL}/api/ai/lesson`,
        { topic },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setCleanedHTML(cleanHtmlString(response.data.lessonPlan));
    } catch (error) {
      setError(
        "An error occurred while generating the lesson. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">
          Lesson Generator
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-secondary-700"
            >
              What topic would you like to create a lesson for?
            </label>
            <div className="md:flex-row flex-col mt-2 flex gap-4 ">
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-2 min-h-[38px]"
                placeholder="e.g., React Hooks, TypeScript Generics"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateLesson}
                disabled={!topic || isGenerating}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                Generate Lesson
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {cleanedHTML && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div
            dangerouslySetInnerHTML={{ __html: cleanedHTML }}
            className="responsetext"
          />
        </motion.div>
      )}
    </div>
  );
}
