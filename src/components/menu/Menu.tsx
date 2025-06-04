import "./menu.css";

export default function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`menu ${isOpen ? "open" : "closed"}`}>
      <ul>
        <li><a href="">Home</a></li>
        <li><a href="">About</a></li>
        <li><a href="">Shop</a></li>
        <li><a href="">FAQs</a></li>
      </ul>
    </div>
  );
}
