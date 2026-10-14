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
                  <svg viewBox="0 0 48 52" aria-hidden="true">
                    <defs>
                      <linearGradient id={`tile-die-${r.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor={r.ui.accentColor} />
                        <stop offset="1" stopColor={r.ui.accentColor} />
                      </linearGradient>
                      <linearGradient id={`tile-light-${r.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="white" stopOpacity=".32" />
                        <stop offset=".45" stopColor="white" stopOpacity="0" />
                        <stop offset="1" stopColor="#160c06" stopOpacity=".48" />
                      </linearGradient>
                      <pattern
                        id={`tile-grain-${r.id}`}
                        width="6"
                        height="7"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="1" cy="2" r=".45" fill="white" opacity=".16" />
                        <circle cx="4" cy="5" r=".5" fill="#100b08" opacity=".18" />
                        <path
                          d="M3 1l1 .5M0 6l1 .5"
                          stroke="white"
                          strokeWidth=".35"
                          opacity=".12"
                        />
                      </pattern>
                    </defs>
                    <path d="M24 2 45 14 45 38 24 50 3 38 3 14Z" fill={`url(#tile-die-${r.id})`} />
                    <path
                      d="M24 2 45 14 45 38 24 50 3 38 3 14Z"
                      fill={`url(#tile-light-${r.id})`}
                      stroke="none"
                    />
                    <path
                      d="M24 2 45 14 45 38 24 50 3 38 3 14Z"
                      fill={`url(#tile-grain-${r.id})`}
                      stroke="none"
                    />
                    <path
                      d="M24 2 24 10M3 14 24 10 45 14M3 14 10 35 3 38M45 14 38 35 45 38M24 10 10 35 38 35ZM10 35 24 50 38 35"
                      fill="none"
                      stroke="white"
                      strokeOpacity=".35"
                      strokeWidth="1"
                    />
                    <text
                      x="24"
                      y="31"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
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
