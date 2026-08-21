import { useState } from "react";
import "../index.css";
function YieldPrediction() {
  const [formData, setFormData] = useState({
    cropYear: "",
    season: "",
    state: "",
    area: "",
    rainfall: "",
    fertilizer: "",
    pesticides: "",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      /*
        Backend connection will be added here.

        Example later:

        const result = await predictYield(formData);

        setPrediction(result.predicted_yield);
      */

      // Temporary demo response
      setTimeout(() => {
        setPrediction("--");
        setLoading(false);
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(
        "Unable to predict yield. Please check that the backend is running."
      );
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      cropYear: "",
      season: "",
      state: "",
      area: "",
      rainfall: "",
      fertilizer: "",
      pesticides: "",
    });

    setPrediction(null);
    setError("");
  };

  return (
    <div className="yield-prediction-page">

      {/* HEADER */}
      <section className="yield-header">

        <p className="dashboard-label">
          AI AGRICULTURE INTELLIGENCE
        </p>

        <h1>
          Predict your crop's
          <span> yield.</span>
        </h1>

        <p>
          Enter your crop and farming details to estimate
          the expected agricultural yield using FarmStack AI.
        </p>

      </section>


      <div className="yield-container">

        {/* FORM */}
        <form
          className="yield-form"
          onSubmit={handleSubmit}
        >

          {/* CROP INFORMATION */}
          <div className="yield-form-section">

            <h2>🌾 Crop Information</h2>

            <div className="yield-form-grid">

              <div className="yield-form-group">

                <label>Crop Year</label>

                <input
                  type="number"
                  name="cropYear"
                  placeholder="e.g. 2025"
                  value={formData.cropYear}
                  onChange={handleChange}
                  min="2000"
                  max="2100"
                  required
                />

              </div>


              <div className="yield-form-group">

                <label>Season</label>

                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select season
                  </option>

                  <option value="Kharif">
                    Kharif
                  </option>

                  <option value="Rabi">
                    Rabi
                  </option>

                  <option value="Summer">
                    Summer
                  </option>

                  <option value="Whole Year">
                    Whole Year
                  </option>

                  <option value="Winter">
                    Winter
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* LOCATION */}
          <div className="yield-form-section">

            <h2>📍 Farm Location</h2>

            <div className="yield-form-grid">

              <div className="yield-form-group full-width">

                <label>State</label>

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select state
                  </option>

                  <option value="Maharashtra">
                    Maharashtra
                  </option>

                  <option value="Gujarat">
                    Gujarat
                  </option>

                  <option value="Karnataka">
                    Karnataka
                  </option>

                  <option value="Madhya Pradesh">
                    Madhya Pradesh
                  </option>

                  <option value="Tamil Nadu">
                    Tamil Nadu
                  </option>

                  <option value="Punjab">
                    Punjab
                  </option>

                  <option value="Haryana">
                    Haryana
                  </option>

                  <option value="Uttar Pradesh">
                    Uttar Pradesh
                  </option>

                  <option value="Rajasthan">
                    Rajasthan
                  </option>

                  <option value="Andhra Pradesh">
                    Andhra Pradesh
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* FARM CONDITIONS */}
          <div className="yield-form-section">

            <h2>🌱 Farm Conditions</h2>

            <div className="yield-form-grid">

              <div className="yield-form-group">

                <label>
                  Area
                  <span> (acres)</span>
                </label>

                <input
                  type="number"
                  name="area"
                  placeholder="e.g. 5"
                  value={formData.area}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>


              <div className="yield-form-group">

                <label>
                  Annual Rainfall
                  <span> (mm)</span>
                </label>

                <input
                  type="number"
                  name="rainfall"
                  placeholder="e.g. 850"
                  value={formData.rainfall}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>

            </div>

          </div>


          {/* INPUTS */}
          <div className="yield-form-section">

            <h2>🧪 Agricultural Inputs</h2>

            <div className="yield-form-grid">

              <div className="yield-form-group">

                <label>
                  Fertilizer
                  <span> (kg)</span>
                </label>

                <input
                  type="number"
                  name="fertilizer"
                  placeholder="e.g. 150"
                  value={formData.fertilizer}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>


              <div className="yield-form-group">

                <label>
                  Pesticides
                  <span> (kg)</span>
                </label>

                <input
                  type="number"
                  name="pesticides"
                  placeholder="e.g. 20"
                  value={formData.pesticides}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>

            </div>

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className="yield-predict-button"
            disabled={loading}
          >

            {loading
              ? "Analyzing Farm Data..."
              : "Predict Crop Yield →"}

          </button>

        </form>


        {/* RESULT AREA */}
        <div className="yield-result-area">

          {!prediction ? (

            <div className="yield-info-card">

              <div className="yield-info-icon">
                🌾
              </div>

              <h3>
                AI Yield Prediction
              </h3>

              <p>
                FarmStack analyzes your farming conditions,
                rainfall, area and agricultural inputs to
                estimate the expected crop yield.
              </p>


              <div className="yield-info-step">

                <span>01</span>

                <p>
                  Enter your crop year and season
                </p>

              </div>


              <div className="yield-info-step">

                <span>02</span>

                <p>
                  Provide your farm conditions
                </p>

              </div>


              <div className="yield-info-step">

                <span>03</span>

                <p>
                  Get your estimated crop yield
                </p>

              </div>

            </div>

          ) : (

            <div className="yield-result-card">

              <p className="yield-result-label">
                FARMSTACK AI PREDICTION
              </p>

              <div className="yield-result-icon">
                🌾
              </div>

              <p className="yield-predicted-label">
                Predicted Crop Yield
              </p>

              <h2>
                {prediction}
              </h2>

              <span className="yield-unit">
                tonnes / hectare
              </span>

              <div className="yield-divider"></div>

              <div className="yield-details">

                <div>
                  <span>Crop Year</span>
                  <strong>
                    {formData.cropYear}
                  </strong>
                </div>

                <div>
                  <span>Season</span>
                  <strong>
                    {formData.season}
                  </strong>
                </div>

                <div>
                  <span>State</span>
                  <strong>
                    {formData.state}
                  </strong>
                </div>

              </div>


              <p className="yield-prediction-note">
                This is an AI-generated estimate based on
                agricultural and historical crop data.
              </p>


              <button
                className="yield-reset-button"
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

export default YieldPrediction;