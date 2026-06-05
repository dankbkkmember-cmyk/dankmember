import { useState } from "react";
import hero from "./assets/LOGO.JPG";

export default function App() {
  const [phone, setPhone] = useState("");
  const [member, setMember] = useState(null);

  const handleSearch = () => {
    // Mock Data (เปลี่ยนเป็น API ทีหลัง)
    setMember({
      name: "Kongthornin",
      level: "GOLD MEMBER",
      points: 12450,
      spend: 86500,
      discount: "5%",
      lastVisit: "04/06/2026",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="src/assets/LOGO.JPG" // เปลี่ยนเป็น path โลโก้ของคุณ
            alt="Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "32px",
              color: "black",
            }}
          >
            DANK MEMBER
          </h1>

          <label>เบอร์โทรศัพพ์ / Phone Number</label>

          <input
            type="text"
            placeholder="08x-xxx-xxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "18px",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ค้นหาสมาชิก
          </button>

          {member && (
            <div
              style={{
                marginTop: "30px",
                borderTop: "1px solid #eee",
                paddingTop: "20px",
              }}
            >
              <h2>{member.name}</h2>

              <p>⭐ {member.level}</p>

              <p>🎁 Points: {member.points.toLocaleString()}</p>

              <p>💰 Spend: {member.spend.toLocaleString()} บาท</p>

              <p>🏷 Discount: {member.discount}</p>

              <p>📅 Last Visit: {member.lastVisit}</p>

              <button
                style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#16a34a",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                ใช้สิทธิ์
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
