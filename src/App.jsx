import { useEffect, useState } from "react";
import Papa from "papaparse";
import hero from "../assets/LOGO.JPG";

export default function App() {
  const [phone, setPhone] = useState("");
  const [member, setMember] = useState(null);
  const [members, setMembers] = useState([]);

  // โหลด CSV
  useEffect(() => {
    fetch("/dankmember/member.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("DATA:", result.data);
            setMembers(result.data); // ✅ สำคัญมาก
          },
        });
      });
  }, []);

  // ค้นหาเบอร์
  const handleSearch = () => {
    const found = members.find(
      (m) => m["Phone Number"]?.replace(/-/g, "") === phone.replace(/-/g, ""),
    );

    if (found) {
      setMember(found);
    } else {
      alert("ไม่พบสมาชิก");
      setMember(null);
    }
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
            src={hero}
            alt=""
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />

          <h1
            style={{
              marginBottom: "30px",
              fontSize: "32px",
              color: "black",
            }}
          >
            DANK MEMBER
          </h1>

          <label>เบอร์โทรศัพท์ / Phone Number</label>

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
                marginTop: "40px",
                borderTop: "1px solid #eee",
                paddingTop: "20px",
                tAlign: "center",
              }}
            >
              <h2 style={{ color: "black" }}>{member["Crm Name"]}</h2>

              <p style={{ color: "black" }}>📞 {member["Phone Number"]}</p>

              <p style={{ color: "black" }}>⭐ {member["Membership Tier"]}</p>

              <p style={{ color: "black" }}>
                🎁 Points: {Number(member["Points"] || 0).toLocaleString()}
              </p>

              <p style={{ color: "black" }}>
                💰 Spend:{" "}
                {Number(member["Total Spending"] || 0).toLocaleString()} บาท
              </p>

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
