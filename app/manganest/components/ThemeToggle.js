"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("manganest-theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("manganest-theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "56px",
        height: "28px",
        borderRadius: "999px",
        background: isDark ? "#c084fc" : "#d1d5db",
        transition: "background 0.3s ease",
        cursor: "pointer",
        border: "none",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <span style={{ position: "absolute", left: "6px", fontSize: "12px", opacity: isDark ? 0 : 1, transition: "opacity 0.2s", pointerEvents: "none" }}>☀️</span>
      <span style={{ position: "absolute", right: "6px", fontSize: "12px", opacity: isDark ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none" }}>🌙</span>
      <span style={{ position: "absolute", top: "2px", width: "24px", height: "24px", background: "#ffffff", borderRadius: "50%", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "transform 0.3s ease", transform: isDark ? "translateX(28px)" : "translateX(2px)", pointerEvents: "none" }} />
    </button>
  );
}