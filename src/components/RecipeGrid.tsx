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
                  <svg viewBox="0 0 240 245" aria-hidden="true">
                    <defs>
                      <linearGradient id={`tile-face-${r.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor={r.ui.accentColor} />
                        <stop offset="1" stopColor="#151820" />
                      </linearGradient>
                      <linearGradient id={`tile-gold-${r.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#fff0a6" />
                        <stop offset=".44" stopColor="#bd7527" />
                        <stop offset=".73" stopColor="#ffe39a" />
                        <stop offset="1" stopColor="#a76420" />
                      </linearGradient>
                    </defs>
                    <g
                      fill={r.ui.accentColor}
                      stroke={`url(#tile-gold-${r.id})`}
                      strokeWidth="3"
                      strokeLinejoin="round"
                    >
                      <path d="M120 8 20 65 120 48Z" />
                      <path d="M120 8 120 48 220 65Z" />
                      <path d="M20 65 48 168 120 48Z" fill={`url(#tile-face-${r.id})`} />
                      <path d="M120 48 192 168 220 65Z" fill={`url(#tile-face-${r.id})`} />
                      <path d="M20 65 20 180 48 168Z" fill="#22272e" />
                      <path d="M220 65 192 168 220 180Z" fill="#0b1018" />
                      <path d="M20 180 120 238 48 168Z" fill="#151a22" />
                      <path d="M192 168 120 238 220 180Z" fill="#080d14" />
                      <path d="M48 168 120 238 192 168Z" fill={`url(#tile-face-${r.id})`} />
                      <path d="M120 48 48 168 192 168Z" fill={`url(#tile-face-${r.id})`} />
                    </g>
                    <path
                      d="M120 8 220 65 220 180 120 238 20 180 20 65Z"
                      fill="none"
                      stroke={`url(#tile-gold-${r.id})`}
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                    <text
                      x="120"
                      y="138"
                      textAnchor="middle"
                      fill="#ffda80"
                      fontSize="44"
                      fontWeight="800"
                      fontFamily="Cinzel, serif"
                      stroke="none"
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
