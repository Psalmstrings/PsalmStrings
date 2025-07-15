import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signup.css"; // Adjust the path as necessary

function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Validate inputs
  if (!name || !email || !password || !confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/adminsignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    // Handle successful signup (e.g., redirect to login page)
    console.log("Signup successful:", data);
    alert("Signup successful! Check your email for verification.");
    // Optionally redirect to login page:
    window.location.href = "/adminlogin";
  } catch (err) {
    setError(err.message || "An error occurred during signup.");
  }
};

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create your account</h2>

        {error && <div className="error-message">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
          </div>


          <button type="submit" className="signup-button">
            Sign up
          </button>

          <p className="login-link">
            Already have an account? <Link to="/adminlogin">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;