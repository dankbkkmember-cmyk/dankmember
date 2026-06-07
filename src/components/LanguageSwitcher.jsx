export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <button
        onClick={() => setLang("th")}
        style={{
          padding: "8px 14px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: lang === "th" ? "#111827" : "#e5e7eb",
          color: lang === "th" ? "white" : "black",
        }}
      >
        🇹🇭 TH
      </button>

      <button
        onClick={() => setLang("en")}
        style={{
          padding: "8px 14px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: lang === "en" ? "#111827" : "#e5e7eb",
          color: lang === "en" ? "white" : "black",
        }}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
