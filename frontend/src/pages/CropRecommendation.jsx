import { useState } from "react";

function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    ph: "",
  });

  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend result
    setRecommendation({
      crop: "Rice",
      suitability: 94,
      reason:
        "The soil nutrients and environmental conditions are highly suitable for rice cultivation.",
    });
  };

  return (
    <div className="recommendation-page">

      <div className="recommendation-header">
        <p className="dashboard-label">AI CROP INTELLIGENCE</p>

        <h1>
          Find the right crop
          <span> for your farm.</span>
        </h1>

        <p>
          Enter your soil and environmental conditions.
          FarmStack will analyze the data and recommend
          suitable crops for your farm.
        </p>
      </div>

      <div className="recommendation-container">

        <form
          className="crop-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">
            <h2>🌱 Soil Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Nitrogen (N)</label>
                <input
                  type="number"
                  name="nitrogen"
                  placeholder="e.g. 90"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phosphorus (P)</label>
                <input
                  type="number"
                  name="phosphorus"
                  placeholder="e.g. 40"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Potassium (K)</label>
                <input
                  type="number"
                  name="potassium"
                  placeholder="e.g. 40"
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Soil pH</label>
                <input
                  type="number"
                  step="0.1"
                  name="ph"
                  placeholder="e.g. 6.5"
                  value={formData.ph}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-section">
            <h2>☀️ Environmental Conditions</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  placeholder="e.g. 25"
                  value={formData.temperature}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Humidity (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="humidity"
                  placeholder="e.g. 70"
                  value={formData.humidity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rainfall (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  name="rainfall"
                  placeholder="e.g. 200"
                  value={formData.rainfall}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          <button
            type="submit"
            className="recommend-button"
          >
            Analyze My Farm →
          </button>

        </form>

        <div className="recommendation-info">

          {!recommendation ? (
            <div className="info-card">

              <div className="info-icon">🤖</div>

              <h3>AI Farm Analysis</h3>

              <p>
                Enter your farm conditions and FarmStack
                will analyze them to find suitable crops.
              </p>

              <div className="info-step">
                <span>01</span>
                <p>Enter your farm conditions</p>
              </div>

              <div className="info-step">
                <span>02</span>
                <p>AI analyzes the data</p>
              </div>

              <div className="info-step">
                <span>03</span>
                <p>Receive crop recommendations</p>
              </div>

            </div>
          ) : (
            <div className="result-card">

              <p className="result-label">
                FARMSTACK RECOMMENDATION
              </p>

              <div className="result-icon">
                🌾
              </div>

              <h2>
                {recommendation.crop}
              </h2>

              <div className="suitability">
                <span>Suitability</span>

                <strong>
                  {recommendation.suitability}%
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  style={{
                    width: `${recommendation.suitability}%`,
                  }}
                ></div>
              </div>

              <p className="result-reason">
                {recommendation.reason}
              </p>

              <button
                className="try-again-button"
                onClick={() => setRecommendation(null)}
              >
                Analyze Again
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default CropRecommendation;