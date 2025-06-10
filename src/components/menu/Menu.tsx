import { Link } from "react-router-dom";
import "./menu.css";

export default function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`menu ${isOpen ? "open" : "closed"}`}>
      <ul>
        <li><a href="">Home</a></li>
        <li><a href="">About</a></li>
        <li><Link to="/product-list">Shop</Link></li>
        <li><Link to="/product-list">FAQs</Link></li>
        <li><Link to="sign-in">Signin</Link></li>
      </ul>
    </div>
  );
}
