import { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { Link } from "react-router-dom"; // Import Link for navigation
import "./navbar.css";
import Searchbar from "../searchbar/Searchbar";
import Menu from "../menu/Menu";

export default function Navbar() {
  const [isLight, setIsLight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Access the cart state from Redux
  const cartItems = useSelector((state: any) => state.cart.products);
  const totalItems = cartItems && cartItems.length > 0 
    ? cartItems.reduce((total: number, item: any) => total + item.quantity, 0) 
    : 0; // Display 0 if the cart is empty

  function toggleMode() {
    setIsLight(!isLight);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false); // Close the menu
  }

  return (
    <div className="navbar" id="nav">
      <div className="nav-manu">
        <span className="logo">
          <img
            id="logo"
            src="/assets/logo-transparent.png" // Ensure the path is correct
            alt="logo"
          />
        </span>
        <span onClick={toggleMenu}>
          <i className="bi bi-list"></i>
        </span>
      </div>

      <Searchbar />

      <div className="nav-profile">
        <span onClick={toggleMode}>
          {isLight ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon"></i>}
        </span>
        <span>
          <Link to="/product-cart"> {/* Add link to shopping cart */}
            <i className="bi bi-cart"></i>
            <span className="cartNumber">{totalItems}</span> {/* Display total items */}
          </Link>
        </span>
        <span> <Link to="/profile"><i className="bi bi-person"></i></Link></span>
      </div>

      {/* Pass the onClose function to the Menu component */}
      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </div>
  );
}