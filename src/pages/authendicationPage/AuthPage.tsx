import "./authPage.css";

export default function AuthPage() {
  return (
    <div className="authpage">
      <form>
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
              placeholder="Enter your name"
              required
            />
          </div>

          <label htmlFor="username">Username:</label>
          <div className="input-with-icon">
            <i className="bi bi-person-badge"></i>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
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
