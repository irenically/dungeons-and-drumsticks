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
                    <path d="M24 2 45 14 45 38 24 50 3 38 3 14Z" fill="currentColor" />
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
