import { Link } from "react-router-dom";
import "./menu.css";

export default function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`menu ${isOpen ? "open" : "closed"}`}>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/about">about</Link></li>
        <li><Link to="/product-list">Shop</Link></li>
        <li><Link to="/faqs">FAQs</Link></li>
        <li><Link to="log-in">login</Link></li>

        <li><Link to="sign-in">Signin</Link></li>
      </ul>
    </div>
  );
}
