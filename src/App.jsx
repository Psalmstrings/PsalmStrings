import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/About";
import Footer from "./component/Footer";
import AuthProvider from "./contexts/Authcontext";
import VerifyAccount from "./pages/VerificationPage";
import Home from "./pages/Index";
import UploadMoviePage from "./pages/UploadMovie";
import UserCommentsPage from "./pages/ReviewPage";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignUp";
import MoviePreview from "./component/SingleMoviePage";
import SingleMoviePage from "./component/SingleMoviePage";
import AdminDashboard from "./pages/AdminPage";
import UserProfile from "./pages/UserPage";



function App() {
  return (
  
     <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <AuthProvider>
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/verify/:token" element={<VerifyAccount />} />
            <Route path='/uploadmovie' element={<UploadMoviePage />} />
            <Route path="/reviewpage" element={<UserCommentsPage />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminsignup" element={<AdminSignup />} />
            <Route path="/movies/:id" element={<SingleMoviePage/>} />
            <Route path="/adminpage" element={<AdminDashboard />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Routes>
        </AuthProvider>
    </Router>
   
  );
}


export default App;