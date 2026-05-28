import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WentixLogoIcon({ className = "", size = "md" }: LogoProps) {
  const dimensions = {
    sm: { width: "40px", height: "20px" },
    md: { width: "70px", height: "35px" },
    lg: { width: "120px", height: "60px" },
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      style={{ filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.45))" }}
    >
      <defs>
        {/* Sky blue to electric turquoise gradient */}
        <linearGradient id="wentixCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#00F5FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00A2FF" stopOpacity="0.4" />
        </linearGradient>
        {/* Center planet glow */}
        <radialGradient id="centerPlanetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00F5FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. CENTRAL GLOWING COHORT PLANET */}
      <circle cx="100" cy="50" r="14" fill="url(#centerPlanetGlow)" className="animate-pulse" />
      <circle cx="100" cy="50" r="5" fill="#00F5FF" />
      <circle cx="100" cy="50" r="8" stroke="#00F5FF" strokeWidth="1" strokeOpacity="0.5" />

      {/* 2. DASHED ANGLE ORBIT PATH */}
      <ellipse
        cx="100"
        cy="50"
        rx="75"
        ry="22"
        fill="none"
        stroke="#00E5FF"
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
        transform="rotate(-12 100 50)"
      />

      {/* 3. SOLID MAIN ORBITAL RING */}
      <ellipse
        cx="100"
        cy="50"
        rx="86"
        ry="25"
        fill="none"
        stroke="url(#wentixCyanGrad)"
        strokeWidth="1.8"
        transform="rotate(-5 100 50)"
      />

      {/* 4. SOLID END APEX DOTS */}
      {/* Calculated rotated points for rx=86, ry=25 rotated -5deg */}
      <circle cx="14" cy="42" r="4" fill="#00F5FF" />
      <circle cx="186" cy="58" r="4" fill="#00F5FF" />

      {/* 5. DRAMATIC WHITE SWEEP VECTOR COMET TRACK */}
      <path
        d="M 85,15 Q 108,30 115,85"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      
      {/* Small node head on the sweep */}
      <circle cx="85" cy="15" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function WentixBrandHeader({ className = "", size = "md" }: LogoProps) {
  const isLarge = size === "lg";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Drawing the brand icon */}
      <WentixLogoIcon size={size === "lg" ? "lg" : "md"} className="flex-shrink-0" />

      {/* Branded typography matches the user's uploaded mock logo exactly */}
      <div className="flex flex-col select-none ml-2">
        <div className="flex items-baseline tracking-normal font-sans">
          <span 
            className="text-white font-extrabold tracking-widest text-[16px] md:text-[20px] uppercase font-sans leading-none"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            WENTIX
          </span>
          <span 
            className="text-accent-cyan font-extrabold italic text-[16px] md:text-[20px] uppercase font-sans leading-none ml-2"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", letterSpacing: "0.05em" }}
          >
            AI
          </span>
        </div>
        <span 
          className="text-accent-cyan tracking-[0.25em] text-[7.5px] uppercase font-medium leading-none block mt-1"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          ORBITAL INTELLIGENCE
        </span>
      </div>
    </div>
  );
}
