import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  SparklesIcon,
  LightBulbIcon,
  EnvelopeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
export default function LandingPage() {
  return (
    <>
      <main className="min-h-screen bg-secondary-50 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className=" mx-auto text-center flex flex-col items-center">
          <img
            src={logo}
            className=" w-[300px] mb-7 rounded-full shadow-[0_2px_20px_#032139] border-[8px] border-[#032139]"
            alt="Logo"
          />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900"
          >
            Empower Your Teaching with{" "}
            <span className="text-primary-500">CourseGPT</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-secondary-600"
          >
            An AI-powered authoring tool that helps educators effortlessly
            generate and organize high-quality educational content.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-10 flex justify-center space-x-4"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="inline-flex items-center px-6 py-3 border border-secondary-300 text-base font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-100"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Features Section */}
        <section
          id="features"
          className="mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <FeatureCard
            icon={
              <BookOpenIcon className="h-10 w-10 text-primary-500 mx-auto" />
            }
            title="Lesson Generator"
            description="Generate structured lessons with outcomes, key concepts, and examples using AI."
          />
          <FeatureCard
            icon={
              <SparklesIcon className="h-10 w-10 text-primary-500 mx-auto" />
            }
            title="Smart Module Builder"
            description="Organize content into smart modules with difficulty levels, sequencing, and metadata."
          />
          <FeatureCard
            icon={
              <LightBulbIcon className="h-10 w-10 text-primary-500 mx-auto" />
            }
            title="AI-Enhanced Editor"
            description="Edit and refine your AI-generated content with section-level regeneration."
          />
        </section>

        {/* About Us Section */}
        <section id="about" className="mt-32 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <UserGroupIcon className="h-10 w-10 text-primary-500 mx-auto" />
            <h2 className="mt-4 text-3xl font-bold text-secondary-900">
              About Us
            </h2>
            <p className="mt-4 text-secondary-600 max-w-2xl mx-auto">
              We’re a team of educators and technologists passionate about
              transforming the way learning content is created. With CourseGPT,
              we aim to make quality education accessible and scalable through
              smart authoring tools.
            </p>
          </motion.div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="mt-32 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow"
          >
            <div className="text-center">
              <EnvelopeIcon className="h-10 w-10 text-primary-500 mx-auto" />
              <h2 className="mt-4 text-3xl font-bold text-secondary-900">
                Contact Us
              </h2>
              <p className="mt-2 text-secondary-600">
                Have questions or want to collaborate? Drop us a message.
              </p>
            </div>
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-secondary-300 rounded-md p-3 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-secondary-300 rounded-md p-3 focus:ring-primary-500 focus:border-primary-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border border-secondary-300 rounded-md p-3 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="w-full bg-primary-500 text-white font-medium py-3 rounded-md hover:bg-primary-600"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </section>
      </main>
      <footer className=" border-t border-secondary-200 pt-8 text-center text-sm text-secondary-500 w-full">
        <p>&copy; {new Date().getFullYear()} CourseGPT. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#features" className="hover:text-secondary-700">
            Features
          </a>
          <a href="#about" className="hover:text-secondary-700">
            About
          </a>
          <a href="#contact" className="hover:text-secondary-700">
            Contact
          </a>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow p-6"
    >
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-secondary-900">{title}</h3>
      <p className="mt-2 text-secondary-600 text-sm">{description}</p>
    </motion.div>
  );
}
