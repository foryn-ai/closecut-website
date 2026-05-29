import { ImageResponse } from "next/og";
import { INTENSIVE_COPY } from "@/lib/copy/intensive";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#FDFCFB",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#2D3748",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: "0.3em", color: "#2D3748" }}>
          THERAFOX
        </div>
        <div style={{ fontSize: 22, letterSpacing: "0.28em", color: "#6B7F6D" }}>
          {INTENSIVE_COPY.hero.title.toUpperCase()}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, marginTop: 24 }}>
          {INTENSIVE_COPY.hero.shortTitle}
        </div>
        <div style={{ fontSize: 28, marginTop: 18, color: "#718096" }}>
          {INTENSIVE_COPY.hero.startingPriceLine}
        </div>
      </div>
    ),
    size,
  );
}
