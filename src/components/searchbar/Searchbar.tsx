import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./searchbar.css";
import type { Product } from "../types/types";

export default function Searchbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  
  // Fetch categories from backend
  const { data: categories } = useFetch<{id: string, name: string}[]>(
    "http://localhost:9000/api/categories"
  );

  function handleSearch() {
    const params = new URLSearchParams();
    
    if (query) params.append("q", query);
    if (category !== "All") params.append("category", category);
    
    if (query || category !== "All") {
      navigate(`/product-list?${params.toString()}`);
    }
  }

  useEffect(() => {
    setQuery("");
    setCategory("All");
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query || category !== "All") {
        handleSearch();
      }
    }, 500); // Debounce search by 500ms
    
    return () => clearTimeout(timer);
  }, [query, category]);

  return (
    <div className="nav-search">
      <select 
        name="category" 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories?.map((cat:Product) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      
      <input 
        type="text" 
        name="search" 
        placeholder="Search products..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <span className="search_icon">
        <i className="bi bi-search"></i>
      </span>
    </div>
  );
}