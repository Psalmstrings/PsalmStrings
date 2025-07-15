import { useState } from "react";
import "../styles/login.css"; // Adjust the path as necessary

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Validate inputs
  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/adminlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    console.log(data);
    

    // Handle successful login (e.g., store token and redirect)
    console.log("Login successful:", data);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Login successful. Welcome to Admin Dashboard");
    window.location.href = "/adminpage"; // Redirect to home or dashboard
  } catch (err) {
    setError(err.message || "An error occurred during login.");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign in: Admin Only</h2>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
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

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;