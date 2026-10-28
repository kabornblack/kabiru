/**
 * The gold "KS" mark from app/icon.svg, as JSX for next/og image routes
 * (opengraph-image, twitter-image, apple-icon).
 */
export function KsMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <g
        fill="none"
        stroke="#b8860b"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 18v28M29 18 15.5 32.5M20.5 27.5 30 46" />
        <path d="M50.5 22.5c-1.6-3-4.3-4.5-7.7-4.5-4.6 0-7.8 2.6-7.8 6.4 0 8.6 16 5.4 16 14 0 4.5-3.5 7.6-8.4 7.6-3.8 0-6.7-1.6-8.3-4.7" />
      </g>
    </svg>
  );
}
