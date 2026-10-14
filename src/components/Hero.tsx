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
const championSparkles = ['✦', '✧', '✦'];
const projectileUsers = new Set(['ranger', 'wizard', 'warlock', 'cleric']);
function BattleCharacter({ name }: { name: string }) {
  return (
    <span className={`fighter fighter-${name}`}>
      {name === 'cleric' ? <span className="cleric-healing-aura" /> : null}
      {name === 'druid' ? (
        <span className="druid-flock">
          {[0, 1, 2].map((index) => (
            <span key={index} className={`spirit-bird bird-${index}`}>
              <svg viewBox="0 0 100 70" aria-hidden="true">
                <path d="M4 32 20 27 29 29 48 35 73 33 94 24 83 42 58 43 34 37 22 36 14 33Z" />
                <path
                  className="spirit-wing"
                  d="M38 35Q42 17 65 3L62 20 77 14 69 30 83 25 62 40Z"
                />
                <circle cx="21" cy="30" r="1.7" fill="#fff" />
              </svg>
            </span>
          ))}
        </span>
      ) : null}
      <img
        className="fighter-art"
        src={`${import.meta.env.BASE_URL}assets/${artwork[name] ?? `${name}.webp`}`}
        alt=""
      />
      <span className="fighter-magic">
        {(name === 'bard' ? bardNotes : name === 'champion' ? championSparkles : []).map(
          (symbol, index) => (
            <span key={index} className={`fighter-particle particle-${index}`}>
              {symbol}
            </span>
          ),
        )}
      </span>
      {projectileUsers.has(name)
        ? Array.from({ length: name === 'warlock' ? 3 : 1 }, (_, index) => (
            <span key={index} className={`fighter-projectile projectile-${index}`}>
              {name === 'ranger' ? <span className="arrow-trail" /> : null}
            </span>
          ))
        : null}
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
        if (source === 'warlock') {
          const volleyTargets = ['rogue', 'cleric', 'paladin'];
          attacker
            .querySelectorAll<HTMLElement>('.fighter-projectile')
            .forEach((projectile, index) => {
              const enemy = scene.querySelector<HTMLElement>(`.fighter-${volleyTargets[index]}`);
              const targetBox = enemy?.getBoundingClientRect();
              if (!targetBox?.width) return;
              const travel = Math.abs(targetBox.left + targetBox.width * 0.5 - launchX);
              projectile.style.setProperty('--flight-distance', `${travel}px`);
              projectile.style.setProperty(
                '--flight-drop',
                `${targetBox.top + targetBox.height * 0.5 - launchY}px`,
              );
              projectile.style.setProperty(
                '--flight-arc',
                `${[Math.min(240, travel * 0.25), 30, -Math.min(100, travel * 0.12)][index]}px`,
              );
            });
        }
        if (source === 'druid') {
          const enemies = ['barbarian', 'warlock', 'champion'];
          attacker.querySelectorAll<HTMLElement>('.spirit-bird').forEach((bird, index) => {
            const enemy = scene.querySelector<HTMLElement>(`.fighter-${enemies[index]}`);
            const targetBox = enemy?.getBoundingClientRect();
            if (!targetBox?.width) return;
            const distance = Math.abs(targetBox.left + targetBox.width * 0.5 - launchX);
            const drop = targetBox.top + targetBox.height * 0.45 - launchY;
            const rise = Math.min(190 + index * 35, from.top + from.height * 0.48 - 100);
            const x = -distance * 0.4;
            const y = -rise * 0.65;
            const paths = [
              `M 0 0 C -20 ${-rise} ${-distance * 0.65} ${-rise} ${-distance} ${drop}`,
              `M 0 0 C -20 ${-rise} ${x * 0.6} ${-rise} ${x} ${y} C ${x + 70} ${y - 80} ${x - 70} ${y - 80} ${x - 70} ${y} C ${x - 70} ${y + 80} ${x + 70} ${y + 80} ${x} ${y} C ${-distance * 0.65} ${-rise} ${-distance * 0.85} ${drop - 80} ${-distance} ${drop}`,
              `M 0 0 C -20 ${-rise} ${-distance * 0.2} ${-rise} ${-distance * 0.35} ${-rise * 0.6} S ${-distance * 0.65} 80 ${-distance * 0.75} ${-rise * 0.3} Q ${-distance * 0.9} ${drop - 80} ${-distance} ${drop}`,
            ];
            bird.style.offsetPath = `path('${paths[index]}')`;
          });
        }
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
