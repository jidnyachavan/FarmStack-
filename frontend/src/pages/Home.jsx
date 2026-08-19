import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page">

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            🌱 {t.home.badge}
          </div>

          <h1>
            {t.home.title1}
            <br />
            <span>{t.home.title2}</span>
          </h1>

          <p>
            {t.home.description}
          </p>

          <div className="hero-buttons">

            <Link to="/dashboard" className="primary-button">
              {t.home.getStarted} →
            </Link>

            <Link to="/dashboard" className="secondary-button">
              {t.home.explore}
            </Link>

          </div>

        </div>

        <div className="hero-visual">

          <div className="ai-card">

            <div className="ai-icon">🌾</div>

            <h3>{t.home.aiTitle}</h3>

            <p>
              {t.home.aiDescription}
            </p>

            <div className="ai-status">
              <span></span>
              {t.home.aiStatus}
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;