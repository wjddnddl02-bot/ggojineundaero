interface SkydiverShapeProps {
  size: number;
  className?: string;
}

export default function SkydiverShape({ size, className }: SkydiverShapeProps) {
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 64 86"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse cx="32" cy="82" rx="10" ry="3" fill="black" opacity="0.15" />

      {/* parachute canopy */}
      <path
        d="M4 22 C4 4 60 4 60 22 C48 16 40 14 32 14 C24 14 16 16 4 22Z"
        fill="var(--color-accent)"
      />
      <path d="M32 14 L32 22 M16 16 L22 22 M48 16 L42 22" stroke="var(--color-mystery-bg, #1d1d1b)" strokeWidth="1" opacity="0.18" />

      {/* suspension lines */}
      <path d="M8 21 L28 48 M56 21 L36 48" stroke="var(--color-text)" strokeWidth="1.4" opacity="0.55" strokeLinecap="round" />

      {/* person */}
      <circle cx="32" cy="53" r="6" fill="var(--color-text)" />
      <path
        d="M32 59 L32 68 M32 62 L23 58 M32 62 L41 58 M32 68 L24 78 M32 68 L40 78"
        stroke="var(--color-text)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
