import { Icon } from './Icon';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export function FantasyButton({
  variant = 'gold',
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'red' | 'gold'; children: ReactNode }) {
  return (
    <button className={`fantasy-button fantasy-button--${variant} ${className}`} {...props}>
      <span className="button-side" aria-hidden="true">
        <Icon name="sparkle" />
      </span>
      <span>{children}</span>
      <span className="button-side" aria-hidden="true">
        <Icon name="sparkle" />
      </span>
    </button>
  );
}
export function Corners() {
  return (
    <>
      {['tl', 'tr', 'bl', 'br'].map((side) => (
        <i key={side} aria-hidden="true" className={`frame-corner c-${side}`} />
      ))}
    </>
  );
}
export function Ornament({ elongated = false }: { elongated?: boolean }) {
  return (
    <div className={`section-ornament ${elongated ? 'elongated' : ''}`} aria-hidden="true">
      <span>
        <i className="ornament-line" />
        <Icon name="sparkles" />
        <i className="ornament-line" />
      </span>
      <span>
        <Icon name="sparkle" />
      </span>
      <span>
        <i className="ornament-line" />
        <Icon name="sparkles" />
        <i className="ornament-line" />
      </span>
    </div>
  );
}
export function MagicBadge({ symbol, color }: { symbol: string; color: string }) {
  return (
    <span className="magic-badge" style={{ '--badge-color': color } as CSSProperties}>
      {symbol}
    </span>
  );
}
export function Scroll({ children }: { children: ReactNode }) {
  return (
    <div className="mini-scroll">
      <Icon name="star" /> &nbsp; {children} &nbsp; <Icon name="star" />
    </div>
  );
}
