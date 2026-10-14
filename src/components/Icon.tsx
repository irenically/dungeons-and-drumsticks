import type { CSSProperties } from 'react';

const files = {
  clock: 'clock.svg',
  swords: 'swords.svg',
  sparkle: 'sparkle.svg',
  sparkles: 'sparkles.svg',
  dice: 'icosahedron.svg',
  close: 'x.svg',
  star: 'star-alt-4-svgrepo-com.svg',
} as const;

export function Icon({ name, className = '' }: { name: keyof typeof files; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`svg-icon ${className}`}
      style={
        { '--icon-url': `url("${import.meta.env.BASE_URL}assets/${files[name]}")` } as CSSProperties
      }
    />
  );
}
