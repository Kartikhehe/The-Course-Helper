import React, { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:1050/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        alert("Redirecting to Login Page!")
        window.location.href = "/login";
      } else {
        alert(data.message || "Error registering user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="https://nwm.iitk.ac.in/skins/elastic/images/logo.svg?s=1702135220" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button">Register</button>
        <a href="/login" className="forgot-password">
          Already Signed in? Login here.
        </a>
      </form>
    </div>
  );
}
