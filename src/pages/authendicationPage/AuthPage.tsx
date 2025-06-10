import "./authPage.css";
import { useState } from "react";
import type { FormData } from "../../components/types/types";
export default function AuthPage() {
  const [formData,setFormData]=useState<FormData>({
    name:"",
    userName:"",
    email:"",
    password:""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };


  return (
    <div className="authpage">
      <form  onSubmit={handleSubmit}>
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
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <label htmlFor="username">Username:</label>
          <div className="input-with-icon">
            <i className="bi bi-person-badge"></i>
            <input

type="text"
name="userName"
id="userName"
value={formData.userName}
onChange={handleChange}


placeholder="Enter your usernam"
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

          <label htmlFor="password">Password:</label>
          <div className="input-with-icon">
            <i className="bi bi-lock"></i> 
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
             value={formData.password}
             
              placeholder="Enter your password"
              required
            />
          </div>

          <button>Sign In</button>
        </div>
      </form>
    </div>
  );
}
