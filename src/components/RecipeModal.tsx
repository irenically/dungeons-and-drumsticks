import { Icon } from './Icon';
import { formatIngredientQuantity, formatMarination } from '../data/formatRecipe';
import { useEffect, useRef } from 'react';
import type { Recipe } from '../types';
import { chickenGrimoire } from '../data/recipes';
export function RecipeModal({
  recipe,
  onClose,
  origin = 'recipe',
}: {
  recipe: Recipe | null;
  onClose: () => void;
  origin?: 'recipe' | 'roll';
}) {
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
        className={`recipe-modal recipe-modal--${origin}`}
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
          <Icon name="close" />
        </button>
        <div className="recipe-modal-content">
          <div className="modal-layout">
            <div className="modal-overview">
              <img
                className="modal-recipe-picture"
                src={`${import.meta.env.BASE_URL}assets/${recipe.ui.image}`}
                alt={`${recipe.name} chicken illustration`}
              />
              <img
                className="modal-recipe-stamp"
                src={`${import.meta.env.BASE_URL}assets/stamps/stamp-d${String(recipe.id).padStart(2, '0')}.png`}
                alt={`D20 roll ${recipe.id}`}
              />
            </div>
            <div className="modal-details">
              {origin === 'roll' ? (
                <div className="modal-ribbon">
                  <Icon name="sparkle" /> THE D20 HAS SPOKEN! <Icon name="sparkle" />
                </div>
              ) : null}
              <h2 id="modal-heading">{recipe.name}</h2>
              {recipe.comment ? <p className="modal-card-comment">{recipe.comment}</p> : null}
              <div className="modal-columns">
                <h3>INGREDIENTS</h3>
                <ul className="modal-ingredient-list">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.name}>
                      <span>
                        {ingredient.name}
                        {ingredient.optional ? ' (optional)' : ''}
                      </span>
                      <span>{formatIngredientQuantity(ingredient)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="modal-marinating">
                <Icon name="clock" /> <span>Marinating time</span>{' '}
                <strong>{formatMarination(recipe)}</strong>
              </p>
              <p className="modal-serving">
                {chickenGrimoire.servingBase.amount} {chickenGrimoire.servingBase.unit}{' '}
                {chickenGrimoire.servingBase.state} {chickenGrimoire.servingBase.ingredient} ·{' '}
                {recipe.region}
              </p>
              <div className="modal-recipe-notes">
                <h3>RECIPE NOTES</h3>
                <p>{recipe.notes}</p>
                <p className="modal-flavor">{recipe.flavor}</p>
              </div>
            </div>
          </div>
        </div>{' '}
      </section>
    </div>
  );
}
