// Footer.js
import React from 'react';
import '../styles/footer.css'; // We'll create this next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Psalmstrings. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;