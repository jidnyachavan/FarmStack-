import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getMarketPrices } from "../services/api";

function MarketPrices() {
  const { t } = useLanguage();
const [filters, setFilters] = useState({
  commodity: "",
  state: "",
  district: "",
  market: "",
});

const handleChange = (e) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value,
  });
};

const handleSearch = async (e) => {
  e.preventDefault();

  if (
    !filters.commodity ||
    !filters.state ||
    !filters.district ||
    !filters.market
  ) {
    setError("Please select all market filters.");
    return;
  }

  try {
    setLoading(true);
    setError("");
    setSearched(true);

    const result = await getMarketPrices(filters);

    if (!result.found) {
      setPriceData(null);
      setError(result.message);
      return;
    }

    setPriceData(result);

  } catch (err) {
    console.error(err);
    setPriceData(null);
    setError("Unable to fetch market prices. Please check that the backend is running.");
  } finally {
    setLoading(false);
  }
};

const [searched, setSearched] = useState(false);
 const [priceData, setPriceData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(""); 
 
return (
    <div className="market-prices-page">

      {/* HEADER */}
      <section className="market-header">
        <p className="dashboard-label">LIVE MARKET INTELLIGENCE</p>

        <h1>
          {t.market.title}
        </h1>

        <p>
          {t.market.subtitle}
        </p>
      </section>

      {/* FILTER SECTION */}
      <section className="market-filter-card">

        <h2>Find Market Prices</h2>

        <div className="market-filter-grid">

          <div className="market-form-group">
            <label>Commodity</label>
           <select
  name="commodity"
  value={filters.commodity}
  onChange={handleChange}
>
  <option value="">Select commodity</option>
  <option value="Onion">Onion</option>
  <option value="Potato">Potato</option>
  <option value="Tomato">Tomato</option>
  <option value="Cabbage">Cabbage</option>
  <option value="Cauliflower">Cauliflower</option>
</select>
          </div>

          <div className="market-form-group">
            <label>State</label>
            <select
  name="state"
  value={filters.state}
  onChange={handleChange}
>
  <option value="">Select state</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Goa">Goa</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Karnataka">Karnataka</option>
</select>
          </div>

          <div className="market-form-group">
            <label>District</label>
            <select
  name="district"
  value={filters.district}
  onChange={handleChange}
>
  <option value="">Select district</option>
  <option value="Nashik">Nashik</option>
  <option value="Pune">Pune</option>
  <option value="Ratnagiri">Ratnagiri</option>
  <option value="Kolhapur">Kolhapur</option>
  <option value="Nagpur">Nagpur</option>
</select>
          </div>

          <div className="market-form-group">
            <label>Market / Mandi</label>
            <select
  name="market"
  value={filters.market}
  onChange={handleChange}
>
  <option value="">Select market</option>
  <option value="Lasalgaon">Lasalgaon</option>
  <option value="Pune">Pune</option>
  <option value="Nashik">Nashik</option>
  <option value="Ratnagiri">Ratnagiri</option>
  <option value="Kolhapur">Kolhapur</option>
</select>
          </div>

        </div>

        <button
  className="market-search-button"
  onClick={handleSearch}
>
  View Market Prices →
</button>
      </section>

      {/* RESULT AREA */}
      <section className="market-results">

  <div className="market-results-header">
    <div>
      <p className="dashboard-label">MARKET OVERVIEW</p>

      <h2>
        {searched
          ? `${filters.commodity} Prices`
          : "Today's Prices"}
      </h2>
    </div>

    <span className="market-date">
      {searched
        ? `${filters.market}, ${filters.district}, ${filters.state}`
        : "Latest available data"}
    </span>
  </div>

        {/* PRICE CARDS */}
        <div className="market-price-grid">
{error && (
  <div className="market-error">
    ⚠️ {error}
  </div>
)}
          <div className="market-price-card">
            <span>Minimum Price</span>
            <h3>
  {loading
    ? "Loading..."
    : priceData
    ? `₹${priceData.min_price.toLocaleString("en-IN")}`
    : "--"}
</h3>
            <p>per quintal</p>
          </div>

          <div className="market-price-card featured">
            <span>Modal Price</span>
            <h3>
  {loading
    ? "Loading..."
    : priceData
    ? `₹${priceData.modal_price.toLocaleString("en-IN")}`
    : "--"}
</h3>
            <p>per quintal</p>
          </div>

          <div className="market-price-card">
            <span>Maximum Price</span>
            <h3>
  {loading
    ? "Loading..."
    : priceData
    ? `₹${priceData.max_price.toLocaleString("en-IN")}`
    : "--"}
</h3>
            <p>per quintal</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default MarketPrices;