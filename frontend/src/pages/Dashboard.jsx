import { Link } from "react-router-dom";

function Dashboard() {
  const features = [
    {
      icon: "🌱",
      title: "Crop Recommendation",
      description: "Find the most suitable crop based on your farm conditions.",
      path: "/crop-recommendation",
    },
    {
      icon: "📊",
      title: "Yield Prediction",
      description: "Predict the expected yield of your selected crop.",
      path: "/yield-prediction",
    },
    {
      icon: "🌾",
      title: "Harvest Prediction",
      description: "Estimate the ideal time to harvest your crop.",
      path: "/harvest-prediction",
    },
    {
      icon: "💰",
      title: "Market Prices",
      description: "Explore current agricultural market prices.",
      path: "/market-prices",
    },
    {
      icon: "📈",
      title: "Price Forecast",
      description: "Understand future crop price trends.",
      path: "/price-forecast",
    },
    {
      icon: "🤖",
      title: "AI Farming Assistant",
      description: "Ask questions and get intelligent farming insights.",
      path: "/chatbot",
    },
  ];

  return (
    <div className="dashboard-page">

      <section className="dashboard-header">
        <div>
          <p className="dashboard-label">FARMSTACK INTELLIGENCE</p>

          <h1>
            Welcome to your
            <span> Farm Dashboard</span>
          </h1>

          <p className="dashboard-description">
            Make smarter agricultural decisions using AI-powered
            recommendations, predictions and market intelligence.
          </p>
        </div>
      </section>

      <section className="features-section">

        <div className="section-heading">
          <div>
            <h2>What would you like to do?</h2>
            <p>
              Choose an intelligent tool to get started.
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
                Explore →
              </span>
            </Link>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;