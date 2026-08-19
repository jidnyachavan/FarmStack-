import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span className="logo-icon">🌱</span>
        <span>FarmStack</span>
      </Link>

      <div className="navbar-links">

        <Link to="/">
          {t.navbar.home}
        </Link>

        <Link to="/dashboard">
          {t.navbar.dashboard}
        </Link>

        <Link to="/crop-recommendation">
          {t.navbar.cropRecommendation}
        </Link>

        <Link to="/market-prices">
          {t.navbar.marketPrices}
        </Link>

        {/* LANGUAGE */}
        <div className="language-dropdown">

          <button className="language-button">
            🌐{" "}
            {language === "english"
              ? "English"
              : language === "marathi"
              ? "मराठी"
              : "हिंदी"}{" "}
            ▾
          </button>

          <div className="language-menu">

            <button
              className={language === "english" ? "selected" : ""}
              onClick={() => setLanguage("english")}
            >
              ✓ English
            </button>

            <button
              className={language === "marathi" ? "selected" : ""}
              onClick={() => setLanguage("marathi")}
            >
              मराठी
            </button>

            <button
              className={language === "hindi" ? "selected" : ""}
              onClick={() => setLanguage("hindi")}
            >
              हिंदी
            </button>

          </div>
        </div>

        <Link to="/dashboard" className="navbar-button">
          {t.navbar.getStarted}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;