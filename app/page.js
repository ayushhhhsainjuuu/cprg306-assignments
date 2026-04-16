import Link from "next/link";

export default function Home() {
  const weeks = [
    { href: "/week-2", label: "Week 2", desc: "Shopping List" },
    { href: "/week-3", label: "Week 3", desc: "Shopping List" },
    { href: "/week-4", label: "Week 4", desc: "Shopping List" },
    { href: "/week-5", label: "Week 5", desc: "New Item Form" },
    { href: "/week-6", label: "Week 6", desc: "New Item Form with Validation" },
    { href: "/week-7", label: "Week 7", desc: "Shopping List Refactor" },
    { href: "/week-8", label: "Week 8", desc: "Shopping List with Meal Ideas" },
    { href: "/week-9", label: "Week 9", desc: "Firebase Auth Shopping List" },
    { href: "/week-10", label: "Week 10", desc: "Firestore Shopping List" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e1e30", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>SAIT · CPRG 306</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", letterSpacing: "0.1em", margin: "4px 0 0", color: "#fff" }}>
            Web Development 2
          </h1>
        </div>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Ayush Sainju</p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 40px" }}>

        {/* MangaNest featured card */}
        <Link href="/manganest" style={{ textDecoration: "none", display: "block", marginBottom: "48px" }}>
          <div style={{
            background: "linear-gradient(135deg, #1a0533 0%, #2d1054 50%, #1a0533 100%)",
            border: "1px solid #7c3aed",
            borderRadius: "16px",
            padding: "32px",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(192,132,252,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Glow effect */}
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px" }}>🌸</span>
              <span style={{ background: "#7c3aed", color: "#fff", fontSize: "10px", fontWeight: "600", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Final Project</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.1em", margin: "0 0 8px", color: "#fff" }}>MangaNest</h2>
            <p style={{ fontSize: "14px", color: "#a78bfa", margin: "0 0 20px" }}>
              A full-stack manga search app with Firebase auth, Firestore library, Jikan API integration, and light/dark mode.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Next.js", "Firebase", "Jikan API", "Tailwind CSS", "Firestore"].map((tag) => (
                <span key={tag} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#c084fc" }}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ marginTop: "20px", fontSize: "13px", color: "#7c3aed", fontWeight: "500" }}>
              View Project →
            </div>
          </div>
        </Link>

        {/* Week assignments */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "0.1em", color: "#6b7280", margin: "0 0 16px" }}>
            Weekly Assignments
          </h2>
          <div style={{ display: "grid", gap: "8px" }}>
            {weeks.map((week) => (
              <Link key={week.href} href={week.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "#0f0f1a",
                  border: "1px solid #1e1e30",
                  borderRadius: "10px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                  cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#7c3aed";
                    e.currentTarget.style.background = "#130d1f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1e1e30";
                    e.currentTarget.style.background = "#0f0f1a";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", color: "#7c3aed", letterSpacing: "0.05em", minWidth: "64px" }}>
                      {week.label}
                    </span>
                    <span style={{ fontSize: "14px", color: "#d1d5db" }}>{week.desc}</span>
                  </div>
                  <span style={{ fontSize: "16px", color: "#374151" }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}