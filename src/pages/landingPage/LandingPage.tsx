import ProductCartComponent from '../../components/productCartComponent/ProductCartComponent';
import Hero from '../../components/Hero/Hero3DSection';
import FaqSection from '../../components/FaqSection/FaqSection';
import "../ViewProductPage/ViewProductPage.css"
import AboutPage from '../../components/AboutUs/AboutUs';
import { useEffect } from 'react';

export default function LandingPage() {
  
  useEffect(() => {
    const url_params = new URLSearchParams(window.location.search);
    const token = url_params.get("token");
    
    // Only handle token from URL if it exists
    if (token) {
      localStorage.setItem("token", token);
      // Clean the URL by removing the token parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    
  }, []);
  
  return (
    <div>
      <Hero/>
      <ProductCartComponent/>
      <AboutPage/>
      <FaqSection/>
    </div>
  )
}