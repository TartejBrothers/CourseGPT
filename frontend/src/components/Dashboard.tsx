import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  PuzzlePieceIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import ModuleList from "../elements/modulelist";
import LessonsList from "../elements/lessonslist";

const SectionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="cursor-pointer flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all hover:shadow-lg"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-[#E3B634] text-black rounded-full">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-semibold text-black">{title}</h2>
    </div>
    <p className="mt-4 text-sm text-gray-600">{description}</p>
  </motion.div>
);

export default function Dashboard() {
  const [showAddModule, setShowAddModule] = useState(false);
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
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
  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-black">Welcome Back</h1>
          <p className="text-gray-600 mt-1">
            Select what you want to work on today.
          </p>
        </div>
        <div className="text-[#E3B634] font-semibold text-sm">
          Your Creative Space
        </div>
      </div>

      {/* Main Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionCard
          title="Lessons"
          description="View and manage generated lessons."
          icon={BookOpenIcon}
          onClick={() => navigate("/lessons")}
        />
        <SectionCard
          title="Modules"
          description="Structure your course content into modules."
          icon={PuzzlePieceIcon}
          onClick={() => navigate("/modules")}
        />
        <SectionCard
          title="Editor"
          description="Customize and edit your lessons and content."
          icon={PencilSquareIcon}
          onClick={() => navigate("/editor")}
        />
      </div>
      <h4
        className="
        text-2xl font-bold text-black mb-2 flex items-center gap-2"
      >
        Your Latest Lesson
      </h4>
      <LessonsList count={1} />
      <h4
        className="
        text-2xl font-bold text-black mb-2 flex items-center gap-2"
      >
        Your Modules
      </h4>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <ModuleList modules={filteredModules} />
      </div>
    </div>
  );
}
