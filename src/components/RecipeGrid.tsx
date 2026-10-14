import { useState, type CSSProperties } from 'react';
import { recipes } from '../data/recipes';
import { formatMarination } from '../data/formatRecipe';
import type { Recipe } from '../types';
import { Corners, Ornament } from './Primitives';
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
              <span className="card-badge">{r.id}</span>
              <div className="card-category">✦ {r.ui.category} enchantment ✦</div>
              <img
                className="card-food"
                src={`${import.meta.env.BASE_URL}assets/${r.ui.image}`}
                alt="Watercolor illustration of roasted chicken"
              />
              <h3 className="card-title">{r.name.toUpperCase()}</h3>
              <p className="card-ingredients">
                {r.ingredients
                  .slice(0, 4)
                  .map((ingredient) => ingredient.name)
                  .join(' · ')}
              </p>
              <div className="card-footer">
                <span>D20 · {String(r.id).padStart(2, '0')}</span>
                <span>{formatMarination(r)} · ➜</span>
              </div>
              <Corners />
            </button>
          ))}
      </div>
    </section>
  );
}
