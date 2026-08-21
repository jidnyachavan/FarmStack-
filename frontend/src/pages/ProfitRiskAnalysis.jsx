import { useState } from "react";

function ProfitRiskAnalysis() {
  const [selectedCrop, setSelectedCrop] = useState("Onion");

  const cropData = {
    Onion: {
      profit: 72,
      risk: 28,
    },
    Potato: {
      profit: 64,
      risk: 36,
    },
    Tomato: {
      profit: 81,
      risk: 19,
    },
  };

  const data = cropData[selectedCrop];

  return (
    <div className="profit-risk-page">

      {/* HEADER */}
      <section className="profit-risk-header">

        <p className="dashboard-label">
          FARMSTACK DECISION INTELLIGENCE
        </p>

        <h1>
          Profit & <span>Risk Analysis</span>
        </h1>

        <p>
          Understand the potential profitability and risk
          associated with different crops using FarmStack
          agricultural intelligence.
        </p>

      </section>


      {/* CROP SELECTOR */}
      <section className="profit-risk-selector">

        <label>Select Crop</label>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          <option value="Onion">Onion</option>
          <option value="Potato">Potato</option>
          <option value="Tomato">Tomato</option>
        </select>

      </section>


      {/* MAIN CARDS */}
      <section className="profit-risk-cards">

        {/* PROFIT */}
        <div className="profit-risk-card">

          <p className="card-label">
            PROFIT POTENTIAL
          </p>

          <div className="percentage">
            {data.profit}%
          </div>

          <p className="card-description">
            Estimated profitability based on market
            and agricultural conditions.
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill profit-fill"
              style={{ width: `${data.profit}%` }}
            ></div>
          </div>

        </div>


        {/* RISK */}
        <div className="profit-risk-card">

          <p className="card-label">
            RISK LEVEL
          </p>

          <div className="percentage">
            {data.risk}%
          </div>

          <p className="card-description">
            Estimated risk considering market and
            agricultural uncertainty.
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill risk-fill"
              style={{ width: `${data.risk}%` }}
            ></div>
          </div>

        </div>

      </section>


      {/* OVERVIEW */}
      <section className="analysis-section">

        <div className="analysis-header">

          <div>
            <p className="dashboard-label">
              CROP ANALYSIS
            </p>

            <h2>
              {selectedCrop} Outlook
            </h2>
          </div>

          <span className="analysis-status">
            {data.profit >= 70
              ? "Favorable"
              : "Moderate"}
          </span>

        </div>


        <div className="analysis-grid">

          {/* PROFIT */}
          <div className="analysis-box">

            <h3>Profit Potential</h3>

            <div className="large-number">
              {data.profit}%
            </div>

            <p>
              Higher values indicate stronger expected
              profitability.
            </p>

          </div>


          {/* RISK */}
          <div className="analysis-box">

            <h3>Risk Exposure</h3>

            <div className="large-number">
              {data.risk}%
            </div>

            <p>
              Lower values indicate lower uncertainty
              for the selected crop.
            </p>

          </div>

        </div>

      </section>


      {/* RECOMMENDATION */}
      <section className="recommendation-card">

        <div className="recommendation-icon">
          🌱
        </div>

        <div>

          <p className="dashboard-label">
            FARMSTACK RECOMMENDATION
          </p>

          <h2>
            {data.profit >= 70
              ? "Strong profit potential"
              : "Moderate profit potential"}
          </h2>

          <p>
            {data.risk <= 30
              ? "The selected crop currently shows relatively low risk."
              : "The selected crop has higher uncertainty and should be evaluated carefully."}
          </p>

        </div>

      </section>

    </div>
  );
}

export default ProfitRiskAnalysis;