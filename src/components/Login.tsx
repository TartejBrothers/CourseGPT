import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-secondary-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-secondary-900">
          Welcome back
        </h2>
        <p className="text-center text-secondary-500 text-sm mb-6">
          Log in to your CourseGPT account
        </p>

        <form className="space-y-4">
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-secondary-400 absolute left-3 top-3.5" />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 w-full border border-secondary-300 rounded-md p-2.5 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-secondary-400 absolute left-3 top-3.5" />
            <input
              type="password"
              placeholder="Password"
              className="pl-10 w-full border border-secondary-300 rounded-md p-2.5 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 text-white font-medium py-2.5 rounded-md hover:bg-primary-600"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-secondary-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
