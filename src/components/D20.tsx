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
              <stop stopColor="#4e3b32" />
              <stop offset=".38" stopColor="#15191c" />
              <stop offset="1" stopColor="#08080c" />
            </linearGradient>
            <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#fff0a6" />
              <stop offset=".44" stopColor="#bd7527" />
              <stop offset=".73" stopColor="#ffe39a" />
              <stop offset="1" stopColor="#a76420" />
            </linearGradient>
          </defs>
          <path
            d="M120 5 212 60 235 160 120 235 5 160 27 60Z"
            fill="url(#dieFace)"
            stroke="url(#goldStroke)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M120 5 95 77 27 60M120 5l30 73 62-18M27 60l68 17-90 83 115 75M212 60l-62 18 85 82-115 75M95 77l55 1 45 88-75 69-75-69Z"
            fill="none"
            stroke="#ba812c"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M95 77 45 166l75 69 75-69-45-88Z"
            fill="#202023"
            stroke="#f3bf62"
            strokeWidth="3"
          />
          <path
            d="M45 166 5 160l115 75M195 166l40-6-115 75"
            stroke="#e2a94c"
            fill="none"
            strokeWidth="2"
          />
          <text
            x="120"
            y="165"
            textAnchor="middle"
            fill="#ffda80"
            fontFamily="Cinzel,serif"
            fontWeight="800"
            fontSize="59"
          >
            {value}
          </text>
          <text
            x="62"
            y="115"
            fill="#e8b85b"
            fontFamily="Cinzel"
            fontSize="22"
            transform="rotate(-28 62 115)"
          >
            8
          </text>
          <text
            x="163"
            y="113"
            fill="#e8b85b"
            fontFamily="Cinzel"
            fontSize="22"
            transform="rotate(29 163 113)"
          >
            14
          </text>
          <text x="105" y="53" fill="#f4cf78" fontFamily="Cinzel" fontSize="18">
            ✦
          </text>
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
