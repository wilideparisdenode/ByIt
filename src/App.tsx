import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/navbar/navbar';


import './App.css'
import LandingPage from "./pages/LandingPage";
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
     <Navbar/>
     <LandingPage/>
     <Footer/>
    </>
  )
}

export default App;
