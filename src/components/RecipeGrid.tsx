import { Icon } from './Icon';
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
            {f === 'All' ? (
              'ALL RECIPES'
            ) : (
              <>
                <Icon name="sparkle" /> {f.toUpperCase()}
              </>
            )}
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
                  <img
                    className="card-stamp"
                    src={`${import.meta.env.BASE_URL}assets/stamps/stamp-d${String(r.id).padStart(2, '0')}.png`}
                    alt=""
                  />
                </span>
                <h3 className="card-title">{r.name}</h3>
                <p className="card-description" title={r.comment}>
                  {r.comment || r.flavor}
                </p>
              </div>
              <img
                className="card-food"
                loading="lazy"
                decoding="async"
                src={`${import.meta.env.BASE_URL}assets/${r.ui.image}`}
                alt={`${r.name} chicken illustration`}
              />
              <ul className="card-ingredients">
                <li className="card-ingredients-heading" aria-hidden="true">
                  Ingredients
                </li>
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
                <span>
                  <Icon name="clock" className="card-clock" />
                  <span className="card-time-label">Marinating time</span>
                  {formatMarination(r)}
                </span>
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
