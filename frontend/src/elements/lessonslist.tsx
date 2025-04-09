import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";

interface Lesson {
  _id: string;
  lessonHeading: string;
  lessonData: string;
}
interface LessonsListProps {
  count: number;
  header?: string;
}

const LessonsList: React.FC<LessonsListProps> = ({ header, count }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  function cleanHtmlString(raw: string) {
    return raw
      .replace(/^```html\s*/, "") // Remove ```html from the beginning
      .replace(/```$/, "") // Remove ``` from the end
      .replace(/\n/g, ""); // Remove all newline characters
  }
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const Base_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${Base_URL}/api/ai/lesson`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setLessons(response.data.lessons);
      } catch (err) {
        console.error("Failed to fetch lessons", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);
  const displayedLessons = count
    ? [...lessons].reverse().slice(0, count)
    : [...lessons].reverse();

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-semibold text-black mb-4">{header}</h2>
      {loading ? (
        <div className="text-gray-500">Loading lessons...</div>
      ) : lessons.length === 0 ? (
        <div className="text-gray-500">No lessons found.</div>
      ) : (
        <div className="space-y-4">
          {displayedLessons.map((lesson) => (
            <motion.div
              key={lesson._id}
              whileHover={{ scale: 1.01 }}
              className="border border-gray-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <BookOpenIcon className="h-5 w-5 text-[#E3B634]" />
                <h3 className="text-lg font-medium text-black">
                  {lesson.lessonHeading}
                </h3>
              </div>
              <div className="text-sm text-gray-700 truncate">
                <div
                  dangerouslySetInnerHTML={{
                    __html: cleanHtmlString(lesson.lessonData),
                  }}
                  className="responsetext  max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-[#E3B634]/80 scrollbar-track-black/10 hover:scrollbar-thumb-[#E3B634] max-w-[100vw] text-wrap border border-gray-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LessonsList;
