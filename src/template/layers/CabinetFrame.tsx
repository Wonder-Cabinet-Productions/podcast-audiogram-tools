import React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";

interface CabinetFrameProps {
  /** Filename of the cabinet silhouette asset (unused — we use SVG path) */
  asset: string;
  /** Whether to clip episode art inside the cabinet body */
  artClip?: boolean;
  /** Episode art filename in public/ directory (resolved via staticFile) */
  episodeArtSrc?: string;
}

/**
 * Cabinet SVG path — the full silhouette including decorative top,
 * body, legs with ball/knob details. Extracted from the official
 * brand SVG (logo-primary-dark-bg.svg), viewBox 800x800.
 */
const CABINET_PATH =
  "M664.82,65.26c0-.63-.51-1.14-1.14-1.14-103.93-.12-140.54-16.85-172.86-31.62-24.09-11.01-46.85-21.41-90.84-21.41s-67.28,10.44-91.42,21.49c-32.14,14.72-68.56,31.4-172.28,31.53-.63,0-1.15.51-1.15,1.14v547.22c0,.64.51,1.15,1.15,1.15h76.27s.09.04.09.08c3.47,32.58,12.3,80.64,12.72,107.37,0,.03-.02.07-.05.08-4.64,2.58-7.82,7.49-7.82,13.2s3.03,10.39,7.48,13.02c.03.02.05.05.05.09-.44,6.14-1.17,10.84-2.34,13.33,0,.02-.01.04,0,.06,1.8,9.26,2.61,18.35,2.07,27.22,0,.05.04.1.09.1h15.42c.05,0,.1-.05.09-.1-.54-8.86.28-17.95,2.07-27.22,0-.02,0-.04,0-.06-1.17-2.49-1.91-7.19-2.34-13.33,0-.04.02-.07.05-.09,4.46-2.63,7.48-7.44,7.48-13.02s-3.18-10.62-7.81-13.2c-.03-.02-.05-.05-.05-.08.36-26.62,9.24-74.78,12.72-107.38,0-.05.05-.08.09-.08h294.88s.09.04.09.08c3.47,32.58,12.3,80.64,12.72,107.37,0,.03-.02.07-.05.08-4.64,2.58-7.82,7.49-7.82,13.2s3.03,10.39,7.48,13.02c.03.02.05.05.05.09-.44,6.14-1.17,10.84-2.34,13.33,0,.02-.01.04,0,.06,1.8,9.26,2.61,18.35,2.07,27.22,0,.05.04.1.09.1h15.42c.05,0,.1-.05.09-.1-.54-8.86.28-17.95,2.07-27.22,0-.02,0-.04,0-.06-1.17-2.49-1.91-7.19-2.34-13.33,0-.04.02-.07.05-.09,4.46-2.63,7.48-7.44,7.48-13.02s-3.18-10.62-7.81-13.2c-.03-.02-.05-.05-.05-.08.36-26.62,9.24-74.78,12.72-107.38,0-.05.05-.08.09-.08h76.27c.64,0,1.15-.51,1.15-1.15l-.05-547.22Z";

/**
 * Cabinet body clip (without legs) — the rectangular interior area
 * where the episode art collage is visible through the cabinet.
 */
const CABINET_BODY_CLIP =
  "M664.82,65.26c0-.63-.51-1.14-1.14-1.14-103.93-.12-140.54-16.85-172.86-31.62-24.09-11.01-46.85-21.41-90.84-21.41s-67.28,10.44-91.42,21.49c-32.14,14.72-68.56,31.4-172.28,31.53-.63,0-1.15.51-1.15,1.14v547.22c0,.64.51,1.15,1.15,1.15h528.54c.64,0,1.15-.51,1.15-1.15l-.05-547.22Z";

/**
 * Cabinet frame with optional episode art clipped inside.
 *
 * Rendering strategy (same as OriginalTemplate.tsx):
 * 1. Draw the full cabinet path filled black (silhouette + legs)
 * 2. Clip the episode art image to the cabinet body area
 * 3. Episode art shows through the cabinet interior; legs stay black
 *
 * When no episode art is provided, the cabinet body shows the
 * background layer beneath (spiral visible through transparent cabinet).
 */
export const CabinetFrame: React.FC<CabinetFrameProps> = ({
  artClip = true,
  episodeArtSrc,
}) => {
  const { width, height } = useVideoConfig();

  // Scale cabinet to ~78% of video height, maintaining 1:1 aspect (800x800 viewBox)
  const cabinetDisplayHeight = height * 0.78;
  const cabinetDisplayWidth = cabinetDisplayHeight;
  const svgViewBox = "0 0 800 800";

  // Center position
  const left = (width - cabinetDisplayWidth) / 2;
  const top = (height - cabinetDisplayHeight) / 2;

  // Episode art fills the cabinet body interior (x:136-664, y:64-612)
  const artX = 136;
  const artY = 64;
  const artWidth = 528;
  const artHeight = 548;

  return (
    <AbsoluteFill>
      <svg
        width={cabinetDisplayWidth}
        height={cabinetDisplayHeight}
        viewBox={svgViewBox}
        style={{
          position: "absolute",
          left,
          top,
        }}
      >
        <defs>
          <clipPath id="cabinetBodyClip">
            <path d={CABINET_BODY_CLIP} />
          </clipPath>
        </defs>

        {/* Cabinet silhouette — full shape filled dark */}
        <path d={CABINET_PATH} fill="#0a0a0a" />

        {/* Episode art clipped to cabinet body */}
        {artClip && episodeArtSrc && (
          <g clipPath="url(#cabinetBodyClip)">
            <image
              href={staticFile(episodeArtSrc)}
              x={artX}
              y={artY}
              width={artWidth}
              height={artHeight}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
