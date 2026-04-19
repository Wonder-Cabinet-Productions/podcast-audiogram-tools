import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

interface GalaxySpiralProps {
  /** Filename in public/ directory */
  asset: string;
  /** Rotation speed multiplier (0.5 = half speed) */
  rotationSpeed?: number;
  /** Opacity of the spiral layer */
  opacity?: number;
}

/**
 * Rotating galaxy spiral overlay. The spiral image is white particles
 * on a transparent/black background, so it composites naturally over
 * a colored background.
 */
export const GalaxySpiral: React.FC<GalaxySpiralProps> = ({
  asset,
  rotationSpeed = 0.5,
  opacity = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const loopDuration = fps * 20; // 20-second loop
  const loopFrame = frame % loopDuration;

  const rotation = interpolate(
    loopFrame,
    [0, loopDuration],
    [0, 360 * rotationSpeed]
  );

  const scalePulse =
    1 + Math.sin((loopFrame / loopDuration) * Math.PI * 2) * 0.02;

  // Size so the dense spiral core wraps around the cabinet.
  // The spiral image (2400x2400 RGBA) has max alpha of 71/255 (28%),
  // so the image itself provides transparency — don't over-reduce with
  // the component opacity prop. Size at 1.25x to keep particles
  // concentrated without corner gaps during rotation.
  const spiralSize = Math.max(width, height) * 1.25;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          width: spiralSize,
          height: spiralSize,
          left: (width - spiralSize) / 2,
          top: (height - spiralSize) / 2,
          transform: `rotate(${rotation}deg) scale(${scalePulse})`,
          transformOrigin: "center center",
          opacity,
        }}
      >
        <Img
          src={staticFile(asset)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
