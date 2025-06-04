import { useState } from "react";
import "./navbar.css";
import Searchbar from "../searchbar/Searchbar";
import Menu from "../menu/Menu";

export default function Navbar() {
  const [isLight, setIsLight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMode() {
    setIsLight(!isLight);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="navbar" id="nav">
      <div className="nav-manu">
        <span className="logo">
          <img
            id="logo"
            src="../../buyIt Shopify Logo Maker d742a2b4a5c7cbb2db2b4645c12231bd/logo-transparent.png"
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
        <span><i className="bi bi-cart"></i><span className="cartNumber">0</span></span>
        <span><i className="bi bi-person"></i></span>
      </div>

      <Menu isOpen={menuOpen} />
    </div>
  );
}
