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
            <clipPath id="dieShimmerClip">
              <path d="M120 8 220 65 220 180 120 238 20 180 20 65Z" />
            </clipPath>
            <radialGradient id="cosmicGold">
              <stop stopColor="#fffbed" />
              <stop offset=".35" stopColor="#ffe89a" stopOpacity=".95" />
              <stop offset="1" stopColor="#ffd46c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cosmicViolet">
              <stop stopColor="#e8e1ff" />
              <stop offset=".4" stopColor="#bca0ff" stopOpacity=".8" />
              <stop offset="1" stopColor="#80d8ef" stopOpacity="0" />
            </radialGradient>
            <mask id="dieEdgeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="245">
              <path
                d="M120 8 220 65 220 180 120 238 20 180 20 65Z M120 8 120 48 M20 65 120 48 220 65 M20 65 48 168 20 180 M220 65 192 168 220 180 M120 48 48 168 192 168Z M48 168 120 238 192 168"
                fill="none"
                stroke="white"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
            </mask>
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
          <g
            className="d20-facets"
            stroke="url(#goldStroke)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          >
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
          <g mask="url(#dieEdgeMask)">
            <g className="d20-cosmic-swirl">
              <circle cx="80" cy="50" r="85" fill="url(#cosmicGold)" />
              <circle cx="180" cy="145" r="70" fill="url(#cosmicViolet)" />
              <circle cx="80" cy="210" r="65" fill="url(#cosmicGold)" />
              <path
                d="M120 120C25 0 245 15 210 140S20 245 40 110S160 45 120 120"
                fill="none"
                stroke="#fff3c0"
                strokeWidth="18"
                opacity=".6"
              />
            </g>
          </g>
          <g clipPath="url(#dieShimmerClip)" opacity=".16">
            <g className="d20-cosmic-inner">
              <path
                d="M120 125C35 10 240 35 200 150S30 220 55 100S150 65 120 125"
                fill="none"
                stroke="url(#cosmicViolet)"
                strokeWidth="24"
              />
            </g>
          </g>
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
