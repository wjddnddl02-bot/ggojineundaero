interface DartShapeProps {
  size: number;
  className?: string;
}

export default function DartShape({ size, className }: DartShapeProps) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 56 88"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse cx="28" cy="82" rx="9" ry="3" fill="black" opacity="0.15" />

      <path d="M28 56 L6 85 L26 71 Z" fill="var(--color-accent-soft)" />
      <path d="M28 56 L50 85 L30 71 Z" fill="var(--color-accent-soft)" opacity="0.85" />

      <rect x="24" y="17" width="8" height="42" rx="4" fill="var(--color-pin)" />
      <rect x="24" y="36" width="8" height="3.5" fill="black" opacity="0.14" />
      <rect x="25.5" y="20" width="2.2" height="28" rx="1.1" fill="white" opacity="0.35" />

      <path d="M28 0 L37 24 L28 19 L19 24 Z" fill="var(--color-text)" />
    </svg>
  );
}
