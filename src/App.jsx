import { useEffect, useState } from "react";
import Papa from "papaparse";
import hero from "./assets/LOGO.JPG";

export default function App() {
  const [phone, setPhone] = useState("");
  const [member, setMember] = useState(null);
  const [members, setMembers] = useState([]);
  console.log(members);
  // register states
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    tier: "Silver",
    email: "",
    gender: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    color: "#16a34a",
  });

  // โหลด CSV
  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwGEAAU2YtXrj9VsS0sLNTeCkAuzSfgYWgyZYjnHWJ7yniymo4_TxIwP1O8P1QHvtYnvlXSuvdE7zP/pub?output=csv",
    )
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setMembers(result.data);
          },
        });
      });
  }, []);

  // ค้นหาเบอร์
  const normalizePhone = (p) => (p || "").replace(/\D/g, "").replace(/^0/, "");

  const handleSearch = () => {
    const inputPhone = normalizePhone(phone);

    const found = members.find((m) => {
      const sheetPhone = normalizePhone(m["Phone Number"]);
      return sheetPhone === inputPhone;
    });

    if (found) {
      setMember(found);
    } else {
      alert("ไม่พบสมาชิก");
      setMember(null);
    }
  };

  // สมัครสมาชิก
  const handleRegister = async () => {
    // ✅ เช็คกรอกข้อมูล
    if (
      !registerData.name ||
      !registerData.phone ||
      !registerData.gender ||
      !registerData.birthdate
    ) {
      setPopup({
        show: true,
        message: "กรุณากรอกข้อมูลให้ครบ",
        color: "#dc2626",
      });

      return;
    }

    // ✅ normalize เบอร์
    const normalizePhone = (p) =>
      (p || "").replace(/\D/g, "").replace(/^0/, "");

    const inputPhone = normalizePhone(registerData.phone);

    // ✅ เช็ค format เบอร์ไทย
    if (!/^([689]\d{8}|[689]\d{9})$/.test(inputPhone)) {
      setPopup({
        show: true,
        message: "กรุณากรอกเบอร์โทรให้ถูกต้อง",
        color: "#dc2626",
      });

      return;
    }

    // ✅ เช็ค email เฉพาะตอนกรอก
    if (
      registerData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)
    ) {
      setPopup({
        show: true,
        message: "รูปแบบอีเมลไม่ถูกต้อง",
        color: "#dc2626",
      });

      return;
    }

    // ✅ เช็คเบอร์ซ้ำ
    const existingMember = members.find(
      (m) => normalizePhone(m["Phone Number"]) === inputPhone,
    );

    if (existingMember) {
      setPopup({
        show: true,
        message: "เบอร์นี้เคยสมัครสมาชิกแล้ว",
        color: "#f59e0b",
      });

      setMember(existingMember);

      setShowRegister(false);

      return;
    }

    try {
      setLoading(true);

      await fetch(
        "https://script.google.com/macros/s/AKfycbxLRvMIVhVH9-K6-SpiDnSnMvNVjcO5wWbv9NOYqzwwzfE-5u-ZAsxKlfkb0IPpI3IA2Q/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            name: registerData.name,
            phone: registerData.phone,
            tier: registerData.tier,
            email: registerData.email,
            gender: registerData.gender,
            birthdate: registerData.birthdate,
          }),
        },
      );

      const newMember = {
        "Crm Name": registerData.name,
        "Phone Number": registerData.phone,
        "Membership Tier": registerData.tier,
        Points: 0,
        "Total Spending": 0,
      };

      setMembers((prev) => [...prev, newMember]);

      setMember(newMember);

      setPopup({
        show: true,
        message: "สมัครสมาชิกสำเร็จ 🎉",
        color: "#16a34a",
      });

      setShowRegister(false);

      setRegisterData({
        name: "",
        phone: "",
        tier: "Silver",
        email: "",
        gender: "",
        birthdate: "",
      });

      // auto hide popup
      setTimeout(() => {
        setPopup((prev) => ({
          ...prev,
          show: false,
        }));
      }, 3000);
    } catch (error) {
      console.error("ERROR:", error);

      setPopup({
        show: true,
        message: "เกิดข้อผิดพลาด",
        color: "#dc2626",
      });
    } finally {
      setLoading(false);
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
          {popup.show && (
            <div
              style={{
                background: popup.color,
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              {popup.message}
            </div>
          )}

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

          {/* ปุ่มสมัครสมาชิก */}
          <button
            onClick={() => setShowRegister(!showRegister)}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            สมัครสมาชิก
          </button>

          {/* ฟอร์มสมัคร */}
          {showRegister && (
            <div
              style={{
                marginTop: "25px",
                textAlign: "left",
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    name: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phone: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              />

              <select
                value={registerData.tier}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    tier: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              >
                <option>Silver</option>
                <option>Gold</option>
                <option>VIP</option>
              </select>

              <input
                type="email"
                placeholder="Email (optional)"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              />

              <select
                value={registerData.gender}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    gender: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="date"
                value={registerData.birthdate}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    birthdate: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              />

              <button
                onClick={handleRegister}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: loading ? "#9ca3af" : "#16a34a",
                  color: "white",
                  fontSize: "18px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "กำลังสมัคร..." : "ยืนยันสมัครสมาชิก"}
              </button>
            </div>
          )}

          {member && (
            <div
              style={{
                marginTop: "40px",
                borderTop: "1px solid #eee",
                paddingTop: "20px",
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
