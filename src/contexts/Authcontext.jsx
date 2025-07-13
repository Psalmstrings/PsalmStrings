import axios from "axios";
import { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // FETCH ALL USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    }
  };

  

const signin = async (formData) => {
  setSigningIn(true);
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    
    const { message, accessToken, status, user } = await res.json();
    
    if (status === "success") {
      // Store both token and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);

      console.log("User data:", user);
      
      // Update state to trigger re-renders
      setCurrentUser(user);
      setAuthChecked(true);
      
      toast.success(message);
      navigate("/dashboard");
    } else {
      toast.error(message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Network error during login");
  } finally {
    setSigningIn(false);
  }
};

const logout = () => {
    setUsers(data => data.filter(user => user.id !== currentUser.id))
    setCurrentUser(null);
    setAuthChecked(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");

    navigate('/login'); // Redirect to login page after logout
  };

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  
  if (!accessToken) {
    return false;
  }

  try {
    const decodedToken = jwt.decode(accessToken);
    
    // Check if token is expired
    if (decodedToken?.exp) {
      const currentTime = Date.now() / 36000000; // Convert to minutes
      if (decodedToken.exp < currentTime) {
        logout(); // Clean up expired token and user data
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("Token validation error:", error);
    logout();
    return false;
  }
};

// ... inside your AuthProvider component ...

const verifyAccount = useCallback(async (token) => {
  setVerifyingAccount(true);
  try {
    const res = await axios.post(`${baseUrl}/auth/verify/${token}`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 200) {
      setVerificationData({
        success: true,
        message: res.data.message || "Account verified successfully!",
        data: res.data
      });
    } else {
      throw new Error(res.data.message || "Verification failed");
    }
  } catch (error) {
    setVerificationData({
      success: false,
      message: error.response?.data?.message || error.message || "Verification failed"
    });
  } finally {
    setVerifyingAccount(false);
  }
}, [baseUrl]); // Only recreate if baseUrl changes

  const value = {
    users,
    signingIn,
    logout,
    verifyingAccount,
    verificationData,
    fetchUsers,
    isAuthenticated,
    signin,
    verifyAccount
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;