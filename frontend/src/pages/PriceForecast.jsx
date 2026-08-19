import { useLanguage } from "../context/LanguageContext";

function PriceForecast() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: "50px" }}>
      <h1>{t.priceForecast.title}</h1>

      <p>{t.priceForecast.subtitle}</p>
    </div>
  );
}

export default PriceForecast;