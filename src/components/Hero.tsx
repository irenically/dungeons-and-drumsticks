import { D20 } from './D20';
import { FantasyButton } from './Primitives';
const left = ['artificer', 'cleric', 'monk', 'druid', 'bard', 'paladin', 'rogue'];
const right = ['sorcerer', 'champion', 'wizard', 'ranger', 'barbarian', 'warlock'];
const artwork: Record<string, string> = {
  cleric: 'cleric.png',
  champion: 'champion.png',
  sorcerer: 'sorcerer.png',
};
export function Hero({
  value,
  rolling,
  onRoll,
}: {
  value: number;
  rolling: boolean;
  onRoll: () => void;
}) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">✧ THE CULINARY ADVENTURER'S GUILD ✧</p>
        <h1 id="hero-heading">
          DUNGEONS AND <em>DRUMSTICKS</em>
        </h1>
        <p className="hero-subtitle">20 marinades. One legendary dinner.</p>
        <D20 value={value} rolling={rolling} onRoll={onRoll} />
        <FantasyButton variant="red" className="roll-button" onClick={onRoll} disabled={rolling}>
          {rolling ? 'CASTING FATE…' : 'ROLL THE D20'}
        </FantasyButton>
        <p className="hero-footnote">Let fate decide your next great flavor.</p>
      </div>
      <div className="fighters fighters-left" aria-hidden="true">
        {left.map((name) => (
          <img
            key={name}
            className={`fighter fighter-${name}`}
            src={`${import.meta.env.BASE_URL}assets/${artwork[name] ?? `${name}.webp`}`}
            alt=""
          />
        ))}
      </div>
      <div className="fighters fighters-right" aria-hidden="true">
        {right.map((name) => (
          <img
            key={name}
            className={`fighter fighter-${name}`}
            src={`${import.meta.env.BASE_URL}assets/${artwork[name] ?? `${name}.webp`}`}
            alt=""
          />
        ))}
      </div>
      <div className="hero-transition" aria-hidden="true" />
    </section>
  );
}
