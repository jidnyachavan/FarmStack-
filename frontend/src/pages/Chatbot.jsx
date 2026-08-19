import { useLanguage } from "../context/LanguageContext";

function Chatbot() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: "50px" }}>
      <h1>{t.chatbot.title}</h1>

      <p>{t.chatbot.subtitle}</p>

      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder={t.chatbot.placeholder}
        />

        <button>
          {t.chatbot.send}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;