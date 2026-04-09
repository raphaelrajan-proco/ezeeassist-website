"use client";

/**
 * LottiePlayer — drop-in Lottie animation component.
 *
 * Usage:
 *   import LottiePlayer from "@/components/ui/LottiePlayer";
 *   import myAnimation from "@/public/animations/my-animation.json";
 *
 *   <LottiePlayer animationData={myAnimation} className="w-full" />
 *
 * Until real .json files are supplied, the component renders a styled
 * placeholder so the page layout is preserved.
 */

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottiePlayerProps {
  animationData?: object | null;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  placeholderLabel?: string;
}

export default function LottiePlayer({
  animationData = null,
  loop = true,
  autoplay = true,
  className = "",
  placeholderLabel = "Animation coming soon",
}: LottiePlayerProps) {
  if (!animationData) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-[#00AEEF]/30 bg-[#F7F8FA] ${className}`}
        style={{ minHeight: 200 }}
      >
        <p className="text-xs font-semibold text-gray-400">{placeholderLabel}</p>
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}
