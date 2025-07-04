import "./AboutUs.css";
import { Link } from "react-router-dom";
export default function AboutPage() {
  return (
    <div className="about-container">
        <div className="aboutinfor">
            <h1>About Us</h1>
            <p>
                Welcome to our e-commerce website. We are dedicated to offering you the best products at competitive prices.
                Our mission is to make shopping easy and enjoyable.
            </p>
            <p>
                This site was developed as part of a student defense project, showcasing full-stack skills with React and Express.
            </p>
            <button className="signin"><Link to="sign-in">sign in</Link></button>
        </div>
        <div className="aboutImg">
            <img src="/about.png" alt=""/>
        </div>
    </div>
  );
}
