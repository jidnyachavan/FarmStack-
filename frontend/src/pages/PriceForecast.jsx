import { useState } from "react";
import { predictPrice } from "../services/api";
function PriceForecast() {
  const [formData, setFormData] = useState({
    commodity: "",
    state: "",
    district: "",
    market: "",
    variety: "",
    arrivalDate: "",
  });
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");
  setPrediction(null);

  try {
    console.log("Sending to backend:", formData);

const result = await predictPrice(formData);

console.log("Backend response:", result);
    setPrediction({
      price: result.predicted_modal_price,
      pricePerKg: result.price_per_kg,
      unit: result.unit,
    });
  } catch (err) {
    console.error(err);
    setError(
      "Unable to predict the price. Please check that the backend is running."
    );
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    setPrediction(null);
    setFormData({
      commodity: "",
      state: "",
      district: "",
      market: "",
      variety: "",
      arrivalDate: "",
    });
  };

  return (
    <div className="price-prediction-page">

      {/* HEADER */}
      <section className="price-header">
        <p className="dashboard-label">AI MARKET INTELLIGENCE</p>

        <h1>
          Predict your crop's
          <span> market price.</span>
        </h1>

        <p>
          Enter your crop and market details to estimate the
          expected mandi modal price using FarmStack AI.
        </p>
      </section>

      <div className="price-container">

        {/* FORM */}
        <form className="price-form" onSubmit={handleSubmit}>

          <div className="form-section">
            <h2>🌾 Crop Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Commodity</label>
                <input
                  type="text"
                  name="commodity"
                  placeholder="e.g. Onion"
                  value={formData.commodity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Variety</label>
                <input
                  type="text"
                  name="variety"
                  placeholder="e.g. Local"
                  value={formData.variety}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-section">
            <h2>📍 Market Location</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="e.g. Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="e.g. Nashik"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Market / Mandi</label>
                <input
                  type="text"
                  name="market"
                  placeholder="e.g. Lasalgaon"
                  value={formData.market}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-section">
            <h2>📅 Prediction Date</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Arrival Date</label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          <button
  type="submit"
  className="recommend-button"
  disabled={loading}
>
  {loading ? "Analyzing Market..." : "Predict Market Price →"}
</button>

        </form>
{error && (
  <div className="prediction-error">
    ⚠️ {error}
  </div>
)}
        {/* RESULT / INFO */}
        <div className="price-result-area">

          {!prediction ? (
            <div className="info-card">

              <div className="info-icon">📈</div>

              <h3>AI Price Prediction</h3>

              <p>
                FarmStack analyzes your crop, location,
                market and arrival date to estimate the
                expected modal price.
              </p>

              <div className="info-step">
                <span>01</span>
                <p>Select your crop and variety</p>
              </div>

              <div className="info-step">
                <span>02</span>
                <p>Enter your mandi details</p>
              </div>

              <div className="info-step">
                <span>03</span>
                <p>Get your predicted market price</p>
              </div>

            </div>
          ) : (
            <div className="price-result-card">

              <p className="result-label">
                FARMSTACK AI PREDICTION
              </p>

              <div className="result-icon">
                💰
              </div>

              <p className="predicted-label">
                Predicted Modal Price
              </p>

              <h2>
                ₹{prediction.price.toLocaleString("en-IN")}
              </h2>

              <span className="price-unit">
                per quintal
              </span>

              <div className="price-divider"></div>

              <div className="price-details">

                <div>
                  <span>Approx. per kg</span>
                  <strong>
                    ₹{prediction.pricePerKg}
                  </strong>
                </div>

                <div>
                  <span>Commodity</span>
                  <strong>
                    {formData.commodity}
                  </strong>
                </div>

                <div>
                  <span>Market</span>
                  <strong>
                    {formData.market}
                  </strong>
                </div>

              </div>

              <p className="prediction-note">
                This is an AI-generated estimate based on
                historical agricultural market data.
              </p>

              <button
                className="try-again-button"
                onClick={handleReset}
              >
                Make Another Prediction
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default PriceForecast;