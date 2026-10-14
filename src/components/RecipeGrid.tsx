import { useState, type CSSProperties } from 'react';
import { recipes } from '../data/recipes';
import { formatIngredientQuantity, formatMarination } from '../data/formatRecipe';
import type { Recipe } from '../types';
import { Ornament } from './Primitives';
const filters = ['All', 'Herby', 'Spicy', 'Sweet', 'Savory'] as const;
export function RecipeGrid({
  chosen,
  onOpen,
}: {
  chosen: Recipe | null;
  onOpen: (r: Recipe) => void;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  return (
    <section className="recipes-section container" id="marinades">
      <Ornament elongated />
      <p className="section-kicker">THE GREAT GRIMOIRE OF FLAVOR</p>
      <h2 className="section-title">CHOOSE YOUR CHICKEN MARINADE</h2>
      <p className="section-subtitle">Epic flavors for everyday heroes.</p>
      <div className="filters" role="group" aria-label="Filter marinades">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter ${filter === f ? 'active' : ''}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === 'All' ? 'ALL RECIPES' : `✦ ${f.toUpperCase()}`}
          </button>
        ))}
      </div>
      <div className="recipes-grid">
        {recipes
          .filter((r) => filter === 'All' || r.ui.category === filter)
          .map((r) => (
            <button
              type="button"
              key={r.id}
              className={`recipe-card ${r.id === chosen?.id ? 'is-picked' : ''}`}
              aria-label={`Open ${r.name} marinade recipe`}
              onClick={() => onOpen(r)}
              style={{ '--accent': r.ui.accentColor } as CSSProperties}
            >
              <div className="card-header">
                <span className="card-dice" aria-label={`D20 roll ${r.id}`}>
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <defs>
                      <radialGradient id={`wax-light-${r.id}`} cx="35%" cy="25%" r="80%">
                        <stop stopColor="#fff8df" stopOpacity=".3" />
                        <stop offset=".48" stopColor="#fff8df" stopOpacity="0" />
                        <stop offset="1" stopColor="#170b06" stopOpacity=".45" />
                      </radialGradient>
                      <pattern
                        id={`wax-grain-${r.id}`}
                        width="9"
                        height="8"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="3" r=".5" fill="#fff4da" opacity=".15" />
                        <circle cx="7" cy="6" r=".6" fill="#1d0b04" opacity=".13" />
                      </pattern>
                    </defs>
                    <path
                      className="wax-shape"
                      d="M49 5C57 3 60 8 67 7S77 12 80 19 89 24 89 32 96 43 94 51 95 62 88 68 87 79 78 82 68 91 59 91 49 97 41 92 29 93 23 86 13 81 12 72 4 64 7 55 3 44 7 35 10 24 18 20 22 10 32 11 40 3 49 5Z"
                      fill={r.ui.accentColor}
                    />
                    <path
                      d="M49 5C57 3 60 8 67 7S77 12 80 19 89 24 89 32 96 43 94 51 95 62 88 68 87 79 78 82 68 91 59 91 49 97 41 92 29 93 23 86 13 81 12 72 4 64 7 55 3 44 7 35 10 24 18 20 22 10 32 11 40 3 49 5Z"
                      fill={`url(#wax-light-${r.id})`}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#170b06"
                      strokeOpacity=".3"
                      strokeWidth="3"
                    />
                    <circle
                      cx="50"
                      cy="51.5"
                      r="35"
                      fill="none"
                      stroke="#fff1cf"
                      strokeOpacity=".2"
                      strokeWidth="1.5"
                    />
                    <circle cx="50" cy="50" r="33" fill={`url(#wax-grain-${r.id})`} />
                    <g fill="none" strokeWidth="1.7" strokeLinejoin="round">
                      <path
                        d="M50 20 76 35 76 64 50 80 24 64 24 35Z M50 20 50 31 24 35 M50 31 76 35 M24 35 32 62 24 64 M76 35 68 62 76 64 M50 31 32 62 68 62Z M32 62 50 80 68 62"
                        stroke="#fff1cf"
                        strokeOpacity=".3"
                        transform="translate(0 1.2)"
                      />
                      <path
                        d="M50 20 76 35 76 64 50 80 24 64 24 35Z M50 20 50 31 24 35 M50 31 76 35 M24 35 32 62 24 64 M76 35 68 62 76 64 M50 31 32 62 68 62Z M32 62 50 80 68 62"
                        stroke="#190d08"
                        strokeOpacity=".55"
                      />
                    </g>
                    <text
                      className="wax-number"
                      x="50"
                      y="56"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="800"
                      fontFamily="Cinzel, serif"
                      fill="#fff0cf"
                    >
                      D{r.id}
                    </text>
                  </svg>
                </span>
                <h3 className="card-title">{r.name}</h3>
              </div>
              <img
                className="card-food"
                src={`${import.meta.env.BASE_URL}assets/${r.ui.image}`}
                alt="Watercolor illustration of roasted chicken"
              />
              <ul className="card-ingredients">
                {r.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <span>
                      {ingredient.name}
                      {ingredient.optional ? ' (optional)' : ''}
                    </span>
                    <span className="ingredient-amount">
                      {formatIngredientQuantity(ingredient)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="card-footer">
                <span>{formatMarination(r)}</span>
                <span className="card-open" aria-hidden="true">
                  View recipe →
                </span>
              </div>
            </button>
          ))}
      </div>
    </section>
  );
}
