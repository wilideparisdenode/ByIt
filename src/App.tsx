import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route ,BrowserRouter,Routes} from 'react-router-dom';
import Navbar from './components/navbar/navbar';


import './App.css'
import LandingPage from "./pages/landingPage/LandingPage";
import Footer from './components/Footer/Footer';
import ViewProductPage from './pages/ViewProductPage/ViewProductPage';
import ProductListPage from './pages/productListPage/ProductListPage';
import AuthPage from './pages/authendicationPage/AuthPage';
import FaqSection from './components/FaqSection/FaqSection';
import LogInPage from './pages/authendicationPage/LogInPage';
import AboutPage from './components/AboutUs/AboutUs';
import Profile from './pages/profilePage/Profile';
import ProductList from './pages/productListingPage/ProductList';
import CheckoutPage from './pages/paymentpage/CheckoutPage';

function App() {

  return (
    <>
    <BrowserRouter> 
    <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      
     <Route path='/product-overview/:id' element={<ViewProductPage/>}/>
     <Route path='/product-list' element={<ProductListPage/>}/>
     <Route path='/sign-in' element={<AuthPage/>}/>
     <Route path='/log-in' element={<LogInPage/>}/>
     <Route path='/faqs' element={<FaqSection/>}/>
     <Route path='/about' element={<AboutPage/>}/>
     <Route path='/product-cart' element={<ProductList/>}/>

     <Route path='/profile' element={<Profile/>}/>
     <Route path='/checkoutpage' element={<CheckoutPage/>}/>
    </Routes>  
     
     <Footer/>
    </BrowserRouter>
     
    </>
  )
}

export default App;
