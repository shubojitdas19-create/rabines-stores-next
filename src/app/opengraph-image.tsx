import { ImageResponse } from "next/og";

export const alt = "Rabines Stores - Precision CNC Tooling & Machining Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#11171c",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          border: "8px solid #ef6b32",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#ef6b32",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 900,
              color: "#11171c",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em" }}>
              RABINES STORES
            </span>
            <span style={{ fontSize: "14px", color: "#ef6b32", fontWeight: 700, letterSpacing: "0.1em" }}>
              PRECISION CNC TOOLING &amp; MACHINING
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            High Rigidity CNC Tool Holders &amp; Carbide Inserts
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#9aa3a8",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Milling Chucks · Turning Tool Holders · Carbide Inserts · Precision Job Work
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #232c32",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 600 }}>
            rabines-stores.in
          </span>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "16px",
              color: "#ef6b32",
              fontWeight: 600,
            }}
          >
            <span>Direct Factory Dispatch</span>
            <span>·</span>
            <span>Howrah, West Bengal</span>
            <span>·</span>
            <span>Pan-India Delivery</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
