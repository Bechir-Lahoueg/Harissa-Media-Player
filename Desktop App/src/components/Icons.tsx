type IconProps = { className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function PlayIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M9.3 6.2 17.5 12 9.3 17.8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PauseIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="7" y="5.1" width="3.6" height="13.8" rx="1.5" />
      <rect x="13.4" y="5.1" width="3.6" height="13.8" rx="1.5" />
    </svg>
  )
}

export function PrevIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="5" y="5.5" width="2.4" height="13" rx="1.2" />
      <path d="M19 7.1v9.8a1 1 0 0 1-1.53.85l-7.6-4.9a1 1 0 0 1 0-1.7l7.6-4.9A1 1 0 0 1 19 7.1Z" />
    </svg>
  )
}

export function NextIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="16.6" y="5.5" width="2.4" height="13" rx="1.2" />
      <path d="M5 7.1v9.8a1 1 0 0 0 1.53.85l7.6-4.9a1 1 0 0 0 0-1.7l-7.6-4.9A1 1 0 0 0 5 7.1Z" />
    </svg>
  )
}

export function SeekIcon({ direction, className = 'h-4 w-4' }: IconProps & { direction: 'back' | 'forward' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${direction === 'back' ? '-scale-x-100' : ''}`}
      {...stroke}
      aria-hidden
    >
      <path d="M12 5.5a7 7 0 1 1-6.8 8.6" />
      <path d="M12 2.6v5.8L8.6 5.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function VolumeIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 9.5h3.1L12 5.6v12.8L7.1 14.5H4Z" />
      <path d="M15.4 9.4a3.6 3.6 0 0 1 0 5.2" />
      <path d="M17.9 7a7 7 0 0 1 0 10" />
    </svg>
  )
}

export function VolumeMutedIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 9.5h3.1L12 5.6v12.8L7.1 14.5H4Z" />
      <path d="m16 9.8 4.4 4.4M20.4 9.8 16 14.2" />
    </svg>
  )
}

export function FullscreenIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 9V5.6a1.6 1.6 0 0 1 1.6-1.6H9" />
      <path d="M15 4h3.4A1.6 1.6 0 0 1 20 5.6V9" />
      <path d="M20 15v3.4a1.6 1.6 0 0 1-1.6 1.6H15" />
      <path d="M9 20H5.6A1.6 1.6 0 0 1 4 18.4V15" />
    </svg>
  )
}

export function ExitFullscreenIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M9 4v3.4A1.6 1.6 0 0 1 7.4 9H4" />
      <path d="M20 9h-3.4A1.6 1.6 0 0 1 15 7.4V4" />
      <path d="M15 20v-3.4a1.6 1.6 0 0 1 1.6-1.6H20" />
      <path d="M4 15h3.4A1.6 1.6 0 0 1 9 16.6V20" />
    </svg>
  )
}

export function SidebarIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <rect x="3.2" y="4.5" width="17.6" height="15" rx="2.6" />
      <path d="M9.6 4.5v15" />
    </svg>
  )
}

export function OpenIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M3.4 8.2V6.4A1.9 1.9 0 0 1 5.3 4.5h3.4l1.9 2.3h4.6a1.9 1.9 0 0 1 1.9 1.9v.9" />
      <path d="M3.4 9.7h16.2a1.2 1.2 0 0 1 1.17 1.48l-1.6 6.9a1.9 1.9 0 0 1-1.85 1.42H5.3a1.9 1.9 0 0 1-1.9-1.9Z" />
    </svg>
  )
}

export function QueueIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 6.6h11M4 12h11M4 17.4h7" />
      <path d="M18.2 10.6v6.9" />
      <circle cx="16.4" cy="17.8" r="1.8" />
    </svg>
  )
}

export function NowPlayingIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  )
}

export function ShuffleIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M3.8 6.6h3.1c1.2 0 2.3.6 3 1.6l4.2 6c.7 1 1.8 1.6 3 1.6h2.9" />
      <path d="M3.8 17.8h3.1c1.2 0 2.3-.6 3-1.6l.9-1.3" />
      <path d="M14.6 9.1l.6-.9c.7-1 1.8-1.6 3-1.6h1.8" />
      <path d="m17.8 4.2 2.4 2.4-2.4 2.4M17.8 13.4l2.4 2.4-2.4 2.4" />
    </svg>
  )
}

export function RepeatIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M6.8 7.2h9.4a3.4 3.4 0 0 1 3.4 3.4v.7" />
      <path d="m14.4 4.6 2.6 2.6-2.6 2.6" />
      <path d="M17.2 16.8H7.8a3.4 3.4 0 0 1-3.4-3.4v-.7" />
      <path d="m9.6 19.4-2.6-2.6 2.6-2.6" />
    </svg>
  )
}

export function RepeatOneIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M6.8 7.2h9.4a3.4 3.4 0 0 1 3.4 3.4v.7" />
      <path d="m14.4 4.6 2.6 2.6-2.6 2.6" />
      <path d="M17.2 16.8H7.8a3.4 3.4 0 0 1-3.4-3.4v-.7" />
      <path d="m9.6 19.4-2.6-2.6 2.6-2.6" />
      <path d="M11.4 10.4l1.3-.8v4.8" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="m6.4 6.4 11.2 11.2M17.6 6.4 6.4 17.6" />
    </svg>
  )
}

/** Three bars that dance while a track plays — the only place green appears. */
export function EqualizerIcon({ animated, className = 'h-3.5 w-3.5' }: IconProps & { animated: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={1 + i * 3.6}
          y={1}
          width="2.2"
          height="10"
          rx="1.1"
          fill="currentColor"
          style={{
            transformOrigin: '50% 100%',
            transform: animated ? undefined : 'scaleY(0.4)',
            animation: animated
              ? `harissa-bars ${0.9 + i * 0.22}s ease-in-out ${i * 0.13}s infinite`
              : undefined,
          }}
        />
      ))}
    </svg>
  )
}
