import { useEffect, useRef } from 'react';
import { D20 } from './D20';
import { FantasyButton } from './Primitives';
const left = ['rogue', 'cleric', 'druid', 'bard', 'paladin'];
const right = ['warlock', 'wizard', 'champion', 'ranger', 'barbarian'];
const artwork: Record<string, string> = {
  cleric: 'cleric.png',
  champion: 'champion.png',
};
const bardNotes = ['♪', '♫', '♬'];
const projectileUsers = new Set(['ranger', 'wizard', 'warlock', 'druid', 'cleric']);
function BattleCharacter({ name }: { name: string }) {
  return (
    <span className={`fighter fighter-${name}`}>
      <img
        className="fighter-art"
        src={`${import.meta.env.BASE_URL}assets/${artwork[name] ?? `${name}.webp`}`}
        alt=""
      />
      <span className="fighter-magic">
        {(name === 'bard' ? bardNotes : []).map((symbol, index) => (
          <span key={index} className={`fighter-particle particle-${index}`}>
            {symbol}
          </span>
        ))}
      </span>
      {projectileUsers.has(name) ? <span className="fighter-projectile" /> : null}
    </span>
  );
}
export function Hero({
  value,
  rolling,
  onRoll,
}: {
  value: number;
  rolling: boolean;
  onRoll: () => void;
}) {
  const sceneRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const targets: Record<string, string> = {
      ranger: 'cleric',
      wizard: 'bard',
      warlock: 'rogue',
      druid: 'barbarian',
      cleric: 'ranger',
    };
    const updateFlights = () => {
      for (const [source, target] of Object.entries(targets)) {
        const attacker = scene.querySelector<HTMLElement>(`.fighter-${source}`);
        const defender = scene.querySelector<HTMLElement>(`.fighter-${target}`);
        if (!attacker || !defender) continue;
        const from = attacker.getBoundingClientRect();
        const to = defender.getBoundingClientRect();
        if (!from.width || !to.width) continue;
        const mirrored = attacker.closest('.fighters-left') !== null;
        const launchX = mirrored ? from.right - from.width * 0.24 : from.left + from.width * 0.24;
        const launchY = from.top + from.height * (source === 'ranger' ? 0.4 : 0.48);
        const distance = Math.abs(to.left + to.width * 0.5 - launchX);
        attacker.style.setProperty('--flight-distance', `${distance}px`);
        attacker.style.setProperty('--flight-drop', `${to.top + to.height * 0.5 - launchY}px`);
        attacker.style.setProperty('--flight-arc', `${Math.min(150, distance * 0.18)}px`);
      }
    };
    updateFlights();
    const observer = new ResizeObserver(updateFlights);
    observer.observe(scene);
    scene.querySelectorAll('.fighter').forEach((fighter) => observer.observe(fighter));
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sceneRef} className="hero" aria-labelledby="hero-heading">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">✧ THE CULINARY ADVENTURER'S GUILD ✧</p>
        <h1 id="hero-heading">
          DUNGEONS & <em>DRUMSTICKS</em>
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
          <BattleCharacter key={name} name={name} />
        ))}
      </div>
      <div className="fighters fighters-right" aria-hidden="true">
        {right.map((name) => (
          <BattleCharacter key={name} name={name} />
        ))}
      </div>
      <div className="hero-transition" aria-hidden="true" />
    </section>
  );
}
