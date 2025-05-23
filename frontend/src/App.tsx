import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import LessonGenerator from "./components/LessonGenerator";
import ModuleOrganizer from "./components/ModuleOrganizer";
import ContentEditor from "./components/ContentEditor";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<LessonGenerator />} />
          <Route path="/modules" element={<ModuleOrganizer />} />
          <Route path="/editor" element={<ContentEditor />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
