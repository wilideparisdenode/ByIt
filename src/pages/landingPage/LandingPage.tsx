import ProductCartComponent from '../../components/productCartComponent/ProductCartComponent';
import Hero from '../../components/Hero/Hero3DSection';
import FaqSection from '../../components/FaqSection/FaqSection';
import "../ViewProductPage/ViewProductPage.css"
export default function LandingPage() {
  return (
    <div>
      <Hero/>
      <ProductCartComponent/>
      <FaqSection/>
    </div>
  )
}
