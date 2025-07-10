import { useState, useEffect } from "react";
import "./authPage.css";
import { Link } from "react-router-dom";
import type { FormData } from "../../components/types/types";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const { data, isPending, error, postData } = useFetch<{ token: string } | null>(
    "http://localhost:9000/api/users/login",
    { method: "POST", useAxios: true }
  );
  const navigate = useNavigate();

  const [logIn, setLogIn] = useState<FormData>({
    email: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLogIn(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await postData(logIn); 
  
  }

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
      console.log(data.token)
       navigate("/",{replace:true});
    }
  }, [data]);

  return (
    <div className="authpage">
      <form onSubmit={handleSubmit}>
        <div className="img">
          <img
            src="/buyIt Shopify Logo Maker d742a2b4a5c7cbb2db2b4645c12231bd/logo-transparent.png"
            alt="BuyIt Logo"
          />
          <h3>BuyIt</h3>
        </div>
        <div className="user-info">
          {error && <div className="error-message">{error}</div>}
          
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

          <button disabled={isPending}>
            {isPending ? "Logging in..." : "Log In"}
          </button>
          
          <div className="Google">
            <Link to="http://localhost:9000/api/users/auth/google">
              Sign in with Google <img src="/google.png" alt="Google Logo"/>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}