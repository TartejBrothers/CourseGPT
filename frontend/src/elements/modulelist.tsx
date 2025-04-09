import React from "react";
import { motion } from "framer-motion";
import { TagIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function ModuleList({ modules }: any) {
  if (!modules.length) {
    return (
      <div className="text-center text-secondary-600 py-8">
        No modules available. Start by creating one!
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {modules.map((mod: any) => (
        <motion.div
          key={mod._id}
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-5 shadow-md border border-[#F8F8F8]"
        >
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">
            {mod.name}
          </h2>
          <p className="text-sm text-secondary-600 mb-3">{mod.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {mod.tags.map((tag: any, i: any) => (
              <span
                key={i}
                className="inline-block text-xs px-2 py-1 bg-[#E3B634]/10 text-[#E3B634] rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-secondary-700">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-secondary-500" />
              {mod.estimatedTime}
            </div>
            <span className="px-2 py-0.5 rounded-xl text-xs bg-[#F8F8F8] font-medium">
              {mod.difficulty}
            </span>
          </div>

          {mod.lessons.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-secondary-700 mb-1">
                Lessons:
              </h4>
              <ul className="list-disc list-inside text-sm text-secondary-600">
                {mod.lessons.map((lesson: any) => (
                  <li key={lesson._id}>{lesson.lessonHeading}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
