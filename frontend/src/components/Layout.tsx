import React, { useEffect } from "react";
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
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
interface LayoutProps {
  children: React.ReactNode;
}

import Cookies from "js-cookie";

import { MdOutlineDashboard } from "react-icons/md";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const notify = (message: string) => toast.error(message);
  const navItems = [
    { icon: MdOutlineDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpenIcon, label: "Lessons", href: "/lessons" },
    { icon: Squares2X2Icon, label: "Modules", href: "/modules" },
    { icon: DocumentTextIcon, label: "Editor", href: "/editor" },
  ];
  const [cookies, setCookies] = useState<string | undefined>(undefined);
  useEffect(() => {
    const token = Cookies.get("token");

    if (
      !token &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/"
    ) {
      notify("Please login to access this page");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      setCookies(token);
    }
  }, [cookies, setCookies]);

  return (
    <>
      <ToastContainer />
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
                <img src={logo} className="w-[40px]" alt="Logo" />
                <span className="ml-2 text-xl font-bold text-secondary-900">
                  CourseGPT
                </span>
              </motion.div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {cookies ? (
                <>
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
                </>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 text-sm  border border-transparent font-medium rounded-md h-[70%] text-white bg-primary-500 hover:bg-primary-600"
                >
                  Get Started
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center">
              {cookies ? (
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
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 text-sm  border border-transparent font-medium rounded-md h-[40px] text-white bg-primary-500 hover:bg-primary-600"
                >
                  Get Started
                </Link>
              )}
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
            <div className="pt-20 pb-3 space-y-1 flex flex-col items-center">
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
    <div>
      <Navigation />
      <main className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
