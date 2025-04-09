import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Bars3Icon, PlusIcon } from "@heroicons/react/24/outline";
import AddModule from "../elements/addmodule";
import axios from "axios";
import Cookies from "js-cookie";
import ModuleList from "../elements/modulelist";
export default function ModuleOrganizer() {
  const [showAddModule, setShowAddModule] = useState(false);
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getModules();
  }, []);
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
        <ModuleList modules={modules} />
      </motion.div>
    </div>
  );
}
