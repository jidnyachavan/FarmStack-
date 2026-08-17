import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            🌱 AI-POWERED AGRICULTURE
          </div>

          <h1>
            Smarter Farming.
            <br />
            <span>Better Decisions.</span>
          </h1>

          <p>
            FarmStack brings AI-powered recommendations, predictions,
            market insights and intelligent tools together to help
            farmers make better agricultural decisions.
          </p>

          <div className="hero-buttons">

            <Link to="/dashboard" className="primary-button">
              Get Started →
            </Link>

            <Link to="/dashboard" className="secondary-button">
              Explore FarmStack
            </Link>

          </div>

        </div>

        <div className="hero-visual">

          <div className="ai-card">
            <div className="ai-icon">🌾</div>

            <h3>AI Farming Intelligence</h3>

            <p>
              Data-driven insights for smarter crop planning,
              prediction and market decisions.
            </p>

            <div className="ai-status">
              <span></span>
              AI System Active
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;