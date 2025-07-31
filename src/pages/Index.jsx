import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../contexts/Authcontext";
import "../styles/index.css";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Psalmstrings</h1>
          <p>Your ultimate destination for movies, trailers, and exclusive content</p>
          <div className="auth-buttons">
            <Link to="/login" className="cta-button">
              Sign In
            </Link>
            <Link to="/signup" className="cta-button secondary">
              Join Now
            </Link>
          </div>
        </div>
        <div className="hero-background"></div> {/* Add a cinematic background here */}
      </header>

      <section className="testimonials">
        <h2>Explore</h2>
        <div className="testimonial-card">
          <p>"Psalmstrings offers the best movie experience with its vast library and high-quality streams."</p>
        </div>
        <div className="testimonial-card">
          <p>Are you a content Creator?? </p>
          {/* <div className="auth-buttons">
            <Link to="/adminsignup" className="cta-button">
              Sign Up
            </Link>
            <Link to="/adminlogin" className="cta-button">
              Sign In
            </Link>
          </div> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;