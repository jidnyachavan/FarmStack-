import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span className="logo-icon">🌱</span>
        <span>FarmStack</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/crop-recommendation">
          Crop Recommendation
        </Link>
        <Link to="/market-prices">
          Market Prices
        </Link>
      </div>

      <Link to="/dashboard" className="navbar-button">
        Get Started
      </Link>

    </nav>
  );
}

export default Navbar;