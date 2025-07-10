// src/pages/AuthPage.tsx
import "./authPage.css";
import { useState,useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import type { FormData } from "../../components/types/types";
import { useNavigate } from "react-router-dom";
export default function AuthPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
  });
const navigate=useNavigate();
  // Call useFetch with POST and Axios enabled
  const { data, isPending, error, postData } = useFetch<{ token: string }>(
    "http://localhost:9000/api/users/register",
    { method: "POST", useAxios: true }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger the POST request
    postData(formData);
  };

 useEffect(()=>{
  if(data){
    navigate("/log-in");
  
  }
 },[data])

  return (
    <div className="authpage">
      <form onSubmit={handleSubmit}>
        <div className="img">
          <img
            src="/buyIt Shopify Logo Maker d742a2b4a5c7cbb2db2b4645c12231bd/logo-transparent.png"
            alt=""
          />
          <h3>BuyIt</h3>
        </div>

        <div className="user-info">
          <label htmlFor="name">Name:</label>
          <div className="input-with-icon">
            <i className="bi bi-person"></i>
            <input
              type="text"
              name="full_name"
              id="name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <label htmlFor="email">Email:</label>
          <div className="input-with-icon">
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <label htmlFor="phone_number">Phone Number:</label>
          <div className="input-with-icon">
            <i className="bi bi-telephone-fill"></i>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <label htmlFor="address">Address:</label>
          <div className="input-with-icon">
            <i className="bi bi-geo-alt-fill"></i>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>

          <label htmlFor="password">Password:</label>
          <div className="input-with-icon">
            <i className="bi bi-lock"></i>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Sign Up"}
          </button>

          {error && <p className="error">{error}</p>}
          {data?.token && (
            <p className="success">Registration successful! You are logged in.</p>
          )}
        </div>
      </form>
    </div>
  );
}
