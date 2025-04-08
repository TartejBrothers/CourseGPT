import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import type { Module, Lesson } from '../types';

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    description: 'Learn the basics of React Hooks and their importance in modern React development.',
    learningOutcomes: ['Understand React Hooks', 'Use basic hooks effectively'],
    keyConcepts: ['useState', 'useEffect'],
    activities: ['Hook implementation exercise'],
    difficulty: 'Beginner',
    estimatedTime: 30,
  },
  {
    id: '2',
    title: 'Advanced State Management',
    description: 'Deep dive into complex state management scenarios using React Hooks.',
    learningOutcomes: ['Master complex state patterns'],
    keyConcepts: ['useReducer', 'Custom Hooks'],
    activities: ['Build a custom hook'],
    difficulty: 'Advanced',
    estimatedTime: 45,
  },
];

const mockModule: Module = {
  id: '1',
  title: 'React Fundamentals',
  description: 'A comprehensive introduction to React development',
  lessons: mockLessons,
  difficulty: 'Intermediate',
};

export default function ModuleOrganizer() {
  const [module, setModule] = useState(mockModule);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setModule((module) => {
        const oldIndex = module.lessons.findIndex((lesson) => lesson.id === active.id);
        const newIndex = module.lessons.findIndex((lesson) => lesson.id === over.id);
        
        return {
          ...module,
          lessons: arrayMove(module.lessons, oldIndex, newIndex),
        };
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">{module.title}</h1>
            <p className="mt-2 text-secondary-600">{module.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Lesson
          </motion.button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={module.lessons.map(lesson => lesson.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {module.lessons.map((lesson) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary-50 rounded-xl p-6 cursor-move"
                >
                  <div className="flex items-start gap-4">
                    <Bars3Icon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-secondary-900">{lesson.title}</h3>
                      <p className="mt-1 text-secondary-600">{lesson.description}</p>
                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <span className="text-secondary-500">
                          Difficulty: <span className="font-medium text-secondary-700">{lesson.difficulty}</span>
                        </span>
                        <span className="text-secondary-500">
                          Duration: <span className="font-medium text-secondary-700">{lesson.estimatedTime} min</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </motion.div>
    </div>
  );
}