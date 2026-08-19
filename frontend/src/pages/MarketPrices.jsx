import { useLanguage } from "../context/LanguageContext";

function MarketPrices() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: "50px" }}>
      <h1>{t.market.title}</h1>

      <p>{t.market.subtitle}</p>
    </div>
  );
}

export default MarketPrices;