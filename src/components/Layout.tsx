import React from "react";
import {
  BookOpenIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { icon: BookOpenIcon, label: "Lessons", href: "/lessons" },
    { icon: Squares2X2Icon, label: "Modules", href: "/modules" },
    { icon: DocumentTextIcon, label: "Editor", href: "/editor" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => (window.location.href = "/")}
                className="flex-shrink-0 flex items-center cursor-pointer"
              >
                <BookOpenIcon className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-secondary-900">
                  CourseGPT
                </span>
              </motion.div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  href={item.href}
                  className="text-secondary-600 hover:text-secondary-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <item.icon className="h-5 w-5 inline-block mr-1" />
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-white"
          >
            <div className="pt-20 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  whileHover={{ x: 10 }}
                  href={item.href}
                  className="text-secondary-600 hover:text-secondary-900 block px-3 py-2 rounded-md text-base font-medium"
                >
                  <item.icon className="h-5 w-5 inline-block mr-2" />
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Navigation />
      <main className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
