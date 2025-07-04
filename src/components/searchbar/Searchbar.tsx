// we have to practice what is here
import { useNavigate,useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import "./searchbar.css";
export default function Searchbar() {
  let navigate=useNavigate();
  const [query,setQuery]=useState<string>("");
  const location=useLocation();
  function handleSearch(){
    // const keywords = ["mouse", "phones", "rams", "chargers", "screens","laptops"];

    // const hasMatch = keywords.some((word) => query.includes(word));
    
    // if (hasMatch) {
    if(query.length>0){
      navigate("/product-list?q="+encodeURIComponent(query))   

    }

// }
   
  }
 useEffect(()=>{
      setQuery("");
    },[location.pathname])
  useEffect(()=>{handleSearch()},[query])
  return (
  
          <div className="nav-search">
              <select name="category" id=""onChange={(e)=>{setQuery(e.target.value)}}>
                <option value="All">All</option>
                <option value="Mouse">Mouse</option>
                <option value="watch">watches</option>
                <option value="phone">phones</option>
                <option value="laptop">laptops</option>
                <option value="charger">chargers</option>
                <option value="screen">screens</option>

              </select>
              <input type="text" name="search" placeholder="search ..." onChange={(e)=>{setQuery(e.target.value)}}/>
              <span className="search_icon"><i className="bi bi-search"></i></span>
              <section className="searchP"></section>
          </div>        
     
  
  )
}
