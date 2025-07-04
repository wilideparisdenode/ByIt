import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-brand">ByIt</h2>
          <p className="footer-text">
            Premium quality products at the best prices. Fast delivery and excellent service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product-list">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3 className="footer-heading">Customer Service</h3>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-heading">Stay Connected</h3>
          <form className="footer-form">
            <input type="email" placeholder="Your email" className="footer-input" />
            <button type="submit" className="footer-button">Subscribe</button>
          </form>
          <div className="footer-socials">
            <a href="#" title="Facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" title="Twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" title="Instagram"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ByIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
