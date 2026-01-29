"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Check console for login data");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0f172a",
      color: "white"
    }}>
      <div style={{
        width: "320px",
        padding: "30px",
        borderRadius: "8px",
        backgroundColor: "#020617"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Login to Skill Swap</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "4px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}