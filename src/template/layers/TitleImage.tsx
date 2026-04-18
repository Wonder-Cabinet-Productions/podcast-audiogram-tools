import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";

interface TitleImageProps {
  /** Title image asset filename in public/ directory */
  asset: string;
  /** Layout mode: flanking (left/right of cabinet) or stacked (below) */
  layout: "flanking" | "stacked";
}

/**
 * Show title image with orientation-aware layout.
 *
 * - flanking: "WONDER" left + "CABINET" right of the cabinet (horizontal videos).
 *   Uses the pre-split word assets (wonder.png, cabinet.png) already in public/.
 * - stacked: Full title image centered below the cabinet (vertical videos).
 */
export const TitleImage: React.FC<TitleImageProps> = ({ asset, layout }) => {
  const { width, height } = useVideoConfig();

  if (layout === "flanking") {
    // Use pre-split word images — matches the AE reference exactly
    const wordHeight = 50;
    return (
      <AbsoluteFill>
        {/* "WONDER" on the left */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "42%",
            transform: "translateY(-50%)",
            height: wordHeight,
          }}
        >
          <Img
            src={staticFile("wonder.png")}
            style={{ height: "100%", width: "auto" }}
          />
        </div>
        {/* "CABINET" on the right */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "42%",
            transform: "translateY(-50%)",
            height: wordHeight,
          }}
        >
          <Img
            src={staticFile("cabinet.png")}
            style={{ height: "100%", width: "auto" }}
          />
        </div>
      </AbsoluteFill>
    );
  }

  // Stacked layout — full title centered below cabinet
  const titleHeight = 40;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: height * 0.08,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(asset)}
          style={{ height: titleHeight, width: "auto" }}
        />
      </div>
    </AbsoluteFill>
  );
};
