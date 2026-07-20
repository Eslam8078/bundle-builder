// Small, hand-drawn placeholder icons standing in for product photography.
// Kept as inline SVG so the app has no external image dependency.

const PATHS = {
  camera: (
    <>
      <rect x="10" y="20" width="44" height="32" rx="10" fill="currentColor" opacity="0.12" />
      <circle cx="32" cy="36" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="36" r="5" fill="currentColor" />
      <rect x="24" y="14" width="16" height="8" rx="3" fill="currentColor" opacity="0.5" />
    </>
  ),
  'camera-pan': (
    <>
      <ellipse cx="32" cy="48" rx="18" ry="6" fill="currentColor" opacity="0.12" />
      <rect x="24" y="36" width="16" height="10" rx="4" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="26" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="26" r="5" fill="currentColor" />
    </>
  ),
  floodlight: (
    <>
      <rect x="20" y="30" width="24" height="14" rx="4" fill="currentColor" opacity="0.5" />
      <circle cx="14" cy="20" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="20" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="27" y="44" width="10" height="10" rx="2" fill="currentColor" opacity="0.3" />
    </>
  ),
  doorbell: (
    <>
      <rect x="20" y="10" width="24" height="44" rx="8" fill="currentColor" opacity="0.12" />
      <circle cx="32" cy="26" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="42" r="4" fill="currentColor" />
    </>
  ),
  'battery-cam': (
    <>
      <rect x="18" y="14" width="16" height="36" rx="8" fill="currentColor" opacity="0.5" />
      <circle cx="26" cy="26" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="38" y="30" width="10" height="18" rx="3" fill="currentColor" opacity="0.2" />
    </>
  ),
  sensor: (
    <>
      <rect x="16" y="16" width="32" height="32" rx="10" fill="currentColor" opacity="0.12" />
      <circle cx="32" cy="32" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" />
    </>
  ),
  hub: (
    <>
      <rect x="14" y="24" width="36" height="16" rx="8" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="32" r="3" fill="white" />
      <circle cx="34" cy="32" r="3" fill="white" />
      <circle cx="44" cy="32" r="3" fill="white" />
    </>
  ),
  sdcard: (
    <>
      <path
        d="M22 12h16l6 6v34a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z"
        fill="currentColor"
        opacity="0.5"
      />
      <rect x="24" y="16" width="4" height="10" fill="white" />
      <rect x="30" y="16" width="4" height="10" fill="white" />
      <rect x="36" y="16" width="4" height="10" fill="white" />
    </>
  ),
  protect: (
    <>
      <path
        d="M32 10l18 7v13c0 12-8 19-18 24-10-5-18-12-18-24V17z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M24 32l6 6 12-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  shield: (
    <path
      d="M32 8l16 6v12c0 11-7 17.5-16 20-9-2.5-16-9-16-20V14z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
  ),
  grid: (
    <>
      <rect x="12" y="12" width="16" height="16" rx="4" fill="currentColor" opacity="0.5" />
      <rect x="36" y="12" width="16" height="16" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="12" y="36" width="16" height="16" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="36" y="36" width="16" height="16" rx="4" fill="currentColor" opacity="0.5" />
    </>
  ),
  truck: (
    <>
      <rect x="8" y="22" width="30" height="18" rx="3" fill="currentColor" opacity="0.5" />
      <path d="M38 28h10l6 6v6H38z" fill="currentColor" opacity="0.25" />
      <circle cx="18" cy="44" r="4" fill="currentColor" />
      <circle cx="44" cy="44" r="4" fill="currentColor" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '' }) {
  const content = PATHS[name] ?? PATHS.camera
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {content}
    </svg>
  )
}
