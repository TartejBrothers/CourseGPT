import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Spinner from "../elements/Spinner";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function SignupPage() {
  const notify = (message: string) => toast.success(message);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const Base_URL = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      const response = await axios.post(
        `${Base_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.set("token", response.data.token);

      notify("Account Created! Redirecting to dashboard");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      setLoading(false);
      setError("An error occurred during signup. Please try again.");
    }
  };
  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-secondary-50 px-4 overflow-hidden">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-secondary-900">
          Create your account
        </h2>
        <p className="text-center text-secondary-500 text-sm mb-6">
          Sign up to get started with CourseGPT
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <UserIcon className="w-5 h-5 text-secondary-400 absolute left-3 top-3.5" />
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="pl-10 w-full border border-secondary-300 rounded-md p-2.5 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-secondary-400 absolute left-3 top-3.5" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="pl-10 w-full border border-secondary-300 rounded-md p-2.5 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-secondary-400 absolute left-3 top-3.5" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="pl-10 w-full border border-secondary-300 rounded-md p-2.5 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 text-white font-medium py-2.5 rounded-md hover:bg-primary-600"
          >
            {loading ? <Spinner /> : <>Sign Up</>}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
        <p className="text-center text-sm text-secondary-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-500 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
