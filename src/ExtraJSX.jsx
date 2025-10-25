import React from "react";

export default function ExtraJSX() {
  const phrases = [
    "Learning React ⚛",
    "Building Todo Apps ✅",
    "Fun with JSX 😎",
    "GitHub Language Trick 🚀",
    "Code & Chill 💻",
    "React Hooks FTW!",
  ];

  // Create many repeated lines to increase JS line count
  const repeatedLines = [];
  for (let i = 0; i < 100; i++) {
    repeatedLines.push(
      <p key={i} style={{ margin: "5px 0", color: "#61dafb" }}>
        {phrases[i % phrases.length]}
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Extra Fun JSX Component 🌈</h2>
      <div>{repeatedLines}</div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    minHeight: "300px",
    borderRadius: "12px",
    color: "white",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};
