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
    <div className="dice-stage" aria-label="Magical twenty-sided die">
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
        <svg className="d20-svg" viewBox="0 0 240 245" aria-hidden="true">
          <defs>
            <linearGradient id="dieFace" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#343941" />
              <stop offset="1" stopColor="#11151c" />
            </linearGradient>
            <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#fff0a6" />
              <stop offset=".44" stopColor="#bd7527" />
              <stop offset=".73" stopColor="#ffe39a" />
              <stop offset="1" stopColor="#a76420" />
            </linearGradient>
          </defs>
          {/* A face-on icosahedron: every visible facet is a triangle. */}
          <g stroke="url(#goldStroke)" strokeWidth="2.5" strokeLinejoin="round">
            <path d="M120 8 20 65 120 48Z" fill="#55504a" />
            <path d="M120 8 120 48 220 65Z" fill="#363940" />
            <path d="M20 65 48 168 120 48Z" fill="#343941" />
            <path d="M120 48 192 168 220 65Z" fill="#1c222b" />
            <path d="M20 65 20 180 48 168Z" fill="#22272e" />
            <path d="M220 65 192 168 220 180Z" fill="#0b1018" />
            <path d="M20 180 120 238 48 168Z" fill="#151a22" />
            <path d="M192 168 120 238 220 180Z" fill="#080d14" />
            <path d="M48 168 120 238 192 168Z" fill="#202630" />
            <path d="M120 48 48 168 192 168Z" fill="url(#dieFace)" />
          </g>
          <path
            d="M120 8 220 65 220 180 120 238 20 180 20 65Z"
            fill="none"
            stroke="url(#goldStroke)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <g fill="#ffda80" fontFamily="Cinzel,serif" textAnchor="middle">
            <text x="120" y="139" fontWeight="800" fontSize="48">
              {value}
            </text>
            <text x="65" y="108" fontSize="21" transform="rotate(-60 65 108)">
              {value === 8 ? 16 : 8}
            </text>
            <text x="175" y="108" fontSize="21" transform="rotate(60 175 108)">
              {value === 14 ? 6 : 14}
            </text>
            <text x="120" y="195" fontSize="20" transform="rotate(180 120 190)">
              {value === 2 ? 12 : 2}
            </text>
          </g>
        </svg>
      </button>
      {['one', 'two', 'three', 'four'].map((s, i) => (
        <span key={s} className={`spark spark-${s}`} aria-hidden="true">
          {i % 2 ? '✧' : '✦'}
        </span>
      ))}
    </div>
  );
}
