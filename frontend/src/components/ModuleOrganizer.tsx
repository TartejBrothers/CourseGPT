import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/outline";
import AddModule from "../elements/addmodule";
import axios from "axios";
import Cookies from "js-cookie";
import ModuleList from "../elements/modulelist";
export default function ModuleOrganizer() {
  const [showAddModule, setShowAddModule] = useState(false);
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getModules = async () => {
    const Base_URL = import.meta.env.VITE_BASE_URL;
    try {
      setIsLoading(true);
      const response = await axios.get(`${Base_URL}/api/module`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setModules(response.data.modules);
      setFilteredModules(response.data.modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = modules.filter((mod) => {
      const nameMatch = mod.name.toLowerCase().includes(query);
      const tagMatch = mod.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      const lessonMatch = mod.lessons.some((lesson) =>
        lesson.lessonHeading.toLowerCase().includes(query)
      );

      return nameMatch || tagMatch || lessonMatch;
    });

    setFilteredModules(filtered);
  }, [searchQuery, modules]);

  return (
    <div className="space-y-8">
      <AddModule
        isVisible={showAddModule}
        onClose={() => {
          setShowAddModule(false);
          getModules();
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="md:flex-row flex flex-col justify-between items-center gap-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              Module Organiser
            </h1>
            <p className="mt-2 text-secondary-600">
              Organize your lessons and modules efficiently. Add new modules and
              connect them with lessons to create a structured learning path.
            </p>
          </div>
          <motion.button
            onClick={() => setShowAddModule((prev) => !prev)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="md:w-[150px] justify-center flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full md:mt-0"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Module
          </motion.button>
        </div>
        <div className="flex items-center gap-4 mb-4 w-full flex-1 rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-2 min-h-[38px]">
          <BsSearch color="#818181" />
          <input
            type="text"
            placeholder="Search for Module Name, Tags or Lessons"
            className="focus:outline-none focus:ring-0 focus:border-0 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ModuleList modules={filteredModules} />
      </motion.div>
    </div>
  );
}
