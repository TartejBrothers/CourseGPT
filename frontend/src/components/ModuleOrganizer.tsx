import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/outline";
import AddModule from "../elements/addmodule";

export default function ModuleOrganizer() {
  const [showAddModule, setShowAddModule] = useState(false);

  return (
    <div className="space-y-8">
      <AddModule
        isVisible={showAddModule}
        onClose={() => setShowAddModule(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              Module Organiser
            </h1>
            <p className="mt-2 text-secondary-600">
              Organize your lessons and modules with drag-and-drop
              functionality.
            </p>
          </div>
          <motion.button
            onClick={() => setShowAddModule((prev) => !prev)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Module
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
