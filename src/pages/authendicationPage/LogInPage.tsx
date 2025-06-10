import { useState } from "react";
import "./authPage.css";
import { Link } from "react-router-dom";
import type { FormData } from "../../components/types/types";

export default function LogInPage() {
  const [logIn,setLogIn]=useState<FormData>({
    email:"",
    password:""
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const {name,value}=e.target;
    setLogIn(prev=>({...prev,[name]:value}))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log("formData: ",logIn);
  }
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
         <label htmlFor="email">Email:</label>
          <div className="input-with-icon">
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={logIn.email}
              id="email"
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
              value={logIn.password}
              placeholder="Enter your password"
              required
            />
          </div>

          <button>logIn</button>
          <div className="Google">
          <Link to="#">singIn with Google </Link><img src="/google.png" alt=""/>

          </div>
        </div>
      </form>
    </div>
  );
}
