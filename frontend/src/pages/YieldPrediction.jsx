import { useLanguage } from "../context/LanguageContext";

function YieldPrediction() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: "50px" }}>
      <h1>{t.yield.title}</h1>

      <p>{t.yield.subtitle}</p>
    </div>
  );
}

export default YieldPrediction;