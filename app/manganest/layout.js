"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function MangaNestLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("manganest-theme");
    if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("manganest-theme", nextMode ? "dark" : "light");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white text-black transition-colors dark:bg-[#0a0814] dark:text-white">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        {children}
      </div>
    </div>
  );
}