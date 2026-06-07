import qr from "../assets/qr.png";
import text from "../locales/text";

export default function SuccessModal({ show, onClose, lang }) {
  if (!show) return null;

  const t = text[lang];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "24px",
          padding: "30px",
          textAlign: "center",
          position: "relative",
          animation: "popup 0.25s ease",
        }}
      >
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            border: "none",
            background: "#565657",
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ✕
        </button>

        <h1
          style={{
            fontSize: "32px",
            marginBottom: "10px",
            color: "#16a34a",
          }}
        >
          {t.successfully}
        </h1>

        <p
          style={{
            marginBottom: "24px",
            color: "#444",
            lineHeight: 1.6,
          }}
        >
          {t.review}
        </p>

        <img
          src={qr}
          alt="QR Code"
          style={{
            width: "240px",
            maxWidth: "100%",
            borderRadius: "16px",
          }}
        />

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          {t.scan}
        </p>
      </div>
    </div>
  );
}
