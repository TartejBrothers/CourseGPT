import React from 'react';
import { PlusIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import type { Course } from '../types';
import { motion } from 'framer-motion';

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    lastEdited: new Date('2024-03-10'),
    moduleCount: 5,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    lastEdited: new Date('2024-03-09'),
    moduleCount: 8,
  },
  {
    id: '3',
    title: 'Web Development Fundamentals',
    lastEdited: new Date('2024-03-08'),
    moduleCount: 12,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Welcome back!</h1>
          <p className="mt-2 text-secondary-600">Continue where you left off or start a new course.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Start New Course
        </motion.button>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {mockCourses.map((course) => (
          <motion.div
            key={course.id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary-900">{course.title}</h3>
              <div className="mt-4 flex items-center text-sm text-secondary-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Last edited {course.lastEdited.toLocaleDateString()}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-secondary-500">
                <BookOpenIcon className="h-4 w-4 mr-1" />
                <span>{course.moduleCount} modules</span>
              </div>
              <div className="mt-6">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-primary-500 rounded-2xl text-sm font-medium text-secondary-900 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Continue Editing
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}