import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Dashboard() {
  const { t } = useLanguage();

  const features = [
    {
      icon: "🌱",
      title: t.dashboard.cropRecommendation,
      description: t.dashboard.cropDescription,
      path: "/crop-recommendation",
    },
    {
      icon: "📊",
      title: t.dashboard.yieldPrediction,
      description: t.dashboard.yieldDescription,
      path: "/yield-prediction",
    },
    {
      icon: "🌾",
      title: t.dashboard.harvestPrediction,
      description: t.dashboard.harvestDescription,
      path: "/harvest-prediction",
    },
    {
      icon: "💰",
      title: t.dashboard.marketPrices,
      description: t.dashboard.marketDescription,
      path: "/market-prices",
    },
    {
      icon: "📈",
      title: t.dashboard.priceForecast,
      description: t.dashboard.priceDescription,
      path: "/price-forecast",
    },
    {
      icon: "🤖",
      title: t.dashboard.aiAssistant,
      description: t.dashboard.aiDescription,
      path: "/chatbot",
    },
  ];

  return (
    <div className="dashboard-page">

      <section className="dashboard-header">
        <div>
          <p className="dashboard-label">
            {t.dashboard.label}
          </p>

          <h1>
            {t.dashboard.title}
            <span>{t.dashboard.titleHighlight}</span>
          </h1>

          <p className="dashboard-description">
            {t.dashboard.description}
          </p>
        </div>
      </section>

      <section className="features-section">

        <div className="section-heading">
          <div>
            <h2>{t.dashboard.heading}</h2>

            <p>
              {t.dashboard.subheading}
            </p>
          </div>
        </div>

        <div className="feature-grid">

          {features.map((feature) => (
            <Link
              to={feature.path}
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-arrow">
                {t.dashboard.explore} →
              </span>
            </Link>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;