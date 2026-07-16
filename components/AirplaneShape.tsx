interface AirplaneShapeProps {
  size: number;
  className?: string;
}

export default function AirplaneShape({ size, className }: AirplaneShapeProps) {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 64 46"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse cx="30" cy="42" rx="16" ry="3" fill="black" opacity="0.12" />
      <path d="M2 23 L58 4 L46 23 L58 42 Z" fill="var(--color-text)" />
      <path d="M2 23 L46 23 L26 30 Z" fill="var(--color-accent)" />
    </svg>
  );
}
