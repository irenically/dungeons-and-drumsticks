import { Icon } from './Icon';
import { D20Mesh } from './D20Mesh';
export function D20({
  value,
  rolling,
  onRoll,
}: {
  value: number;
  rolling: boolean;
  onRoll: () => void;
}) {
  return (
    <div
      className={`dice-stage ${rolling ? 'is-rolling' : ''}`}
      aria-label="Magical twenty-sided die"
    >
      <span className="orb orb-one" />
      <span className="orb orb-two" />
      <span className="dice-aura" />
      <button
        type="button"
        className={`d20 ${rolling ? 'rolling' : ''}`}
        onClick={onRoll}
        disabled={rolling}
        aria-label="Roll D20 to choose a random marinade"
      >
        <D20Mesh value={value} rolling={rolling} />
      </button>
      {['one', 'two', 'three', 'four'].map((s, i) => (
        <span key={s} className={`spark spark-${s}`} aria-hidden="true">
          <Icon name={i % 2 ? 'star' : 'sparkle'} />
        </span>
      ))}
    </div>
  );
}
