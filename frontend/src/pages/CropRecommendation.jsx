import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function CropRecommendation() {
  const { t } = useLanguage();

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

    setRecommendation({
      crop: "Rice",
      suitability: 94,
      reason: t.crop.reason,
    });
  };

  return (
    <div className="recommendation-page">

      <div className="recommendation-header">

        <p className="dashboard-label">
          {t.crop.label}
        </p>

        <h1>
          {t.crop.title}
          <span>{t.crop.titleHighlight}</span>
        </h1>

        <p>
          {t.crop.description}
        </p>

      </div>

      <div className="recommendation-container">

        <form
          className="crop-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">

            <h2>{t.crop.soilInfo}</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>{t.crop.nitrogen}</label>

                <input
                  type="number"
                  name="nitrogen"
                  placeholder={t.crop.placeholderNitrogen}
                  value={formData.nitrogen}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.crop.phosphorus}</label>

                <input
                  type="number"
                  name="phosphorus"
                  placeholder={t.crop.placeholderPhosphorus}
                  value={formData.phosphorus}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.crop.potassium}</label>

                <input
                  type="number"
                  name="potassium"
                  placeholder={t.crop.placeholderPotassium}
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.crop.soilPh}</label>

                <input
                  type="number"
                  step="0.1"
                  name="ph"
                  placeholder={t.crop.placeholderPh}
                  value={formData.ph}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-section">

            <h2>{t.crop.environmental}</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>{t.crop.temperature}</label>

                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  placeholder={t.crop.placeholderTemperature}
                  value={formData.temperature}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.crop.humidity}</label>

                <input
                  type="number"
                  step="0.1"
                  name="humidity"
                  placeholder={t.crop.placeholderHumidity}
                  value={formData.humidity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.crop.rainfall}</label>

                <input
                  type="number"
                  step="0.1"
                  name="rainfall"
                  placeholder={t.crop.placeholderRainfall}
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
            {t.crop.analyze}
          </button>

        </form>

        <div className="recommendation-info">

          {!recommendation ? (

            <div className="info-card">

              <div className="info-icon">🤖</div>

              <h3>{t.crop.aiAnalysis}</h3>

              <p>
                {t.crop.aiDescription}
              </p>

              <div className="info-step">
                <span>01</span>
                <p>{t.crop.step1}</p>
              </div>

              <div className="info-step">
                <span>02</span>
                <p>{t.crop.step2}</p>
              </div>

              <div className="info-step">
                <span>03</span>
                <p>{t.crop.step3}</p>
              </div>

            </div>

          ) : (

            <div className="result-card">

              <p className="result-label">
                {t.crop.recommendation}
              </p>

              <div className="result-icon">
                🌾
              </div>

              <h2>
                {recommendation.crop}
              </h2>

              <div className="suitability">

                <span>
                  {t.crop.suitability}
                </span>

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
                {t.crop.analyzeAgain}
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default CropRecommendation;