import { Link } from "react-router-dom";
import "./menu.css";

export default function Menu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className={`menu ${isOpen ? "open" : "closed"}`}>
      <button className="close-btn" onClick={onClose}>X</button> {/* Close button */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/product-list">Shop</Link></li>
        <li><Link to="/faqs">FAQs</Link></li>
        <li><Link to="/log-in">Login</Link></li>
        <li><Link to="/sign-in">Sign In</Link></li>
      </ul>
    </div>
  );
}