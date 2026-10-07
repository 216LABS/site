import { ImageResponse } from "next/og";

// Share card. Images have no theme, so the brand colors are literal here;
// they mirror the dark-theme tokens in globals.css.
export const alt = "216Labs: AI is a lot. I'll make it simple. AI engineering in Cleveland.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17100b",
          color: "#f0e6da",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, letterSpacing: 2 }}>
          <div style={{ display: "flex", fontWeight: 900, fontSize: 44 }}>
            <span style={{ background: "#ff6a1a", color: "#17100b", padding: "0 10px" }}>216</span>
            <span style={{ paddingLeft: 4 }}>LABS</span>
          </div>
          <span style={{ color: "#bba894" }}>CLEVELAND, OH</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontWeight: 900, fontSize: 120, lineHeight: 0.92 }}>
          <span style={{ color: "#bba894" }}>AI IS A LOT.</span>
          <span style={{ display: "flex" }}>
            I&apos;LL MAKE IT&nbsp;
            <span style={{ background: "#ff6a1a", color: "#17100b", padding: "0 12px" }}>SIMPLE.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#bba894", borderTop: "3px solid #f0e6da", paddingTop: 20 }}>
          Voice agents · Support chatbots · AI search visibility · MCP integrations
        </div>
      </div>
    ),
    size,
  );
}
