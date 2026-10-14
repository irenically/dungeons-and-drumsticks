import { formatIngredient, formatMarination } from '../data/formatRecipe';
import { useEffect, useRef } from 'react';
import type { Recipe } from '../types';
import { Corners, FantasyButton } from './Primitives';
import { chickenGrimoire } from '../data/recipes';
export function RecipeModal({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!recipe) return;
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>('.recipe-modal button:not(:disabled)'),
        );
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', keydown);
      prev?.focus();
    };
  }, [recipe, onClose]);
  if (!recipe) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="recipe-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close recipe"
        >
          ✕
        </button>
        <div className="modal-ribbon">✦ &nbsp; A LEGENDARY RECIPE &nbsp; ✦</div>
        <div className="modal-badge">
          D20 · {recipe.id} — {recipe.ui.category.toUpperCase()}
        </div>
        <h2 id="modal-heading">{recipe.name.toUpperCase()}</h2>
        <div className="modal-food">
          <img
            src={`${import.meta.env.BASE_URL}assets/roast-celebration.webp`}
            alt="Roast chicken illustration"
          />
        </div>
        <p className="modal-description">{recipe.flavor}</p>
        <p className="modal-description">
          {recipe.region} · {chickenGrimoire.servingBase.amount} {chickenGrimoire.servingBase.unit}{' '}
          {chickenGrimoire.servingBase.state} {chickenGrimoire.servingBase.ingredient}
          <br />
          Marination: {formatMarination(recipe)}
        </p>
        <div className="modal-columns">
          <div>
            <h3>INGREDIENTS</h3>
            <ul>
              {recipe.ingredients.map((i) => (
                <li key={i.name}>{formatIngredient(i)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>RECIPE NOTES</h3>
            <p>{recipe.notes}</p>
          </div>
        </div>
        <FantasyButton variant="red" className="modal-okay" onClick={onClose}>
          QUEST ACCEPTED
        </FantasyButton>
        <Corners />
      </section>
    </div>
  );
}
