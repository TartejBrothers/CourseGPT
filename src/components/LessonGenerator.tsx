import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowPathIcon, PencilIcon } from '@heroicons/react/24/outline';
import type { Lesson } from '../types';

const initialLesson: Lesson = {
  id: '',
  title: '',
  description: '',
  learningOutcomes: [],
  keyConcepts: [],
  activities: [],
  difficulty: 'Beginner',
  estimatedTime: 0,
};

export default function LessonGenerator() {
  const [topic, setTopic] = useState('');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated API call
    setTimeout(() => {
      setLesson({
        ...initialLesson,
        id: Math.random().toString(),
        title: `Understanding ${topic}`,
        description: `A comprehensive introduction to ${topic} covering fundamental concepts and practical applications.`,
        learningOutcomes: [
          `Understand the core principles of ${topic}`,
          'Apply theoretical knowledge to practical scenarios',
          'Analyze and solve related problems independently',
        ],
        keyConcepts: [
          'Fundamental Principles',
          'Practical Applications',
          'Best Practices',
        ],
        activities: [
          'Interactive coding exercises',
          'Group discussion and problem-solving',
          'Hands-on project implementation',
        ],
        difficulty: 'Beginner',
        estimatedTime: 60,
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Lesson Generator</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-secondary-700">
              What topic would you like to create a lesson for?
            </label>
            <div className="mt-2 flex gap-4">
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 rounded-xl border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g., React Hooks, TypeScript Generics"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
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

      {lesson && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">{lesson.title}</h2>
                <p className="mt-2 text-secondary-600">{lesson.description}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 text-secondary-600 hover:text-secondary-900 rounded-full hover:bg-secondary-50"
              >
                <PencilIcon className="h-5 w-5" />
              </motion.button>
            </div>

            {['Learning Outcomes', 'Key Concepts', 'Activities'].map((section, index) => {
              const content = section === 'Learning Outcomes' 
                ? lesson.learningOutcomes 
                : section === 'Key Concepts' 
                  ? lesson.keyConcepts 
                  : lesson.activities;

              return (
                <div key={section} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900">{section}</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-1 text-secondary-600 hover:text-secondary-900 rounded-full hover:bg-secondary-50"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                  <ul className="space-y-2">
                    {content.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="flex items-start"
                      >
                        <span className="inline-block w-2 h-2 mt-2 mr-3 bg-primary-500 rounded-full" />
                        <span className="text-secondary-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-secondary-200">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-secondary-500">Difficulty:</span>
                  <span className="ml-2 font-medium text-secondary-900">{lesson.difficulty}</span>
                </div>
                <div className="text-sm">
                  <span className="text-secondary-500">Estimated Time:</span>
                  <span className="ml-2 font-medium text-secondary-900">{lesson.estimatedTime} minutes</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Save Lesson
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}