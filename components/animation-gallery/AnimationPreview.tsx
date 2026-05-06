import type { ComponentType } from "react";
import PulseRing from "./previews/PulseRing";
import ShimmerSkeleton from "./previews/ShimmerSkeleton";
import NeonOrbit from "./previews/NeonOrbit";
import Typewriter from "./previews/Typewriter";
import MagneticDots from "./previews/MagneticDots";
import LiquidBlob from "./previews/LiquidBlob";
import FlipCard from "./previews/FlipCard";
import ParticleBurst from "./previews/ParticleBurst";
// import StaggerBars from "./previews/StaggerBars";
import SpotlightCursor from "./previews/SpotlightCursor";
import RippleClick from "./previews/RippleClick";
import GlitchText from "./previews/GlitchText";

const MAP: Record<number, ComponentType> = {
  1: PulseRing,
  2: ShimmerSkeleton,
  3: NeonOrbit,
  4: Typewriter,
  5: MagneticDots,
  6: LiquidBlob,
  7: FlipCard,
  8: ParticleBurst,
  // 9: StaggerBars,
  10: SpotlightCursor,
  11: RippleClick,
  12: GlitchText,
};

interface AnimationPreviewProps {
  id: number;
}

export default function AnimationPreview({ id }: AnimationPreviewProps) {
  const C = MAP[id];
  return C ? <C /> : null;
}