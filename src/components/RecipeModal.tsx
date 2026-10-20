import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Icon } from './Icon';
import { formatIngredientQuantity, formatMarination } from '../data/formatRecipe';
import { chickenGrimoire } from '../data/recipes';
import type { Recipe } from '../types';

// Attachment-bar rows in the 384px-tall stamp assets, measured past transparent padding.
const stampAttachmentRows = [
  54, 53, 51, 52, 54, 41, 40, 40, 41, 41, 45, 45, 46, 46, 46, 40, 39, 40, 40, 40,
];

export function RecipeModal({
  recipe,
  onClose,
}: {
  recipe: Recipe | null;
  onClose: () => void;
  origin?: 'recipe' | 'roll';
}) {
  const [halfPortion, setHalfPortion] = useState(false);
  const portion = halfPortion ? 0.5 : 1;
  if (!recipe) return null;
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className="recipe-dialog"
      aria-labelledby="modal-heading"
      slotProps={{ paper: { className: 'recipe-sheet' } }}
    >
      <IconButton
        autoFocus
        className="recipe-sheet-close"
        onClick={onClose}
        aria-label="Close recipe"
      >
        <Icon name="close" />
      </IconButton>
      <img
        className="recipe-sheet-stamp"
        style={{ top: -((stampAttachmentRows[recipe.id - 1] ?? 46) * 150) / 384 - 1 }}
        src={`${import.meta.env.BASE_URL}assets/stamps/stamp-d${String(recipe.id).padStart(2, '0')}.png`}
        alt={`D20 roll ${recipe.id}`}
      />
      <header className="recipe-sheet-header">
        <div>
          <h2 id="modal-heading">{recipe.name}</h2>
          {recipe.comment ? <p className="recipe-sheet-comment">{recipe.comment}</p> : null}
          <p className="recipe-sheet-origin">{recipe.region}</p>
        </div>
        <img
          className="recipe-sheet-art"
          src={`${import.meta.env.BASE_URL}assets/${recipe.ui.image}`}
          alt={`${recipe.name} chicken illustration`}
        />
      </header>
      <div className="recipe-sheet-scroll">
        <div className="recipe-sheet-body">
          <div className="recipe-sheet-portion">
            <p aria-live="polite">
              For{' '}
              <strong>
                {chickenGrimoire.servingBase.amount * portion} {chickenGrimoire.servingBase.unit}
              </strong>{' '}
              {chickenGrimoire.servingBase.state} {chickenGrimoire.servingBase.ingredient}
            </p>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={halfPortion}
                  onChange={(_, checked) => setHalfPortion(checked)}
                />
              }
              label="Half portion"
            />
          </div>
          <section className="recipe-sheet-ingredients" aria-labelledby="ingredients-heading">
            <h3 id="ingredients-heading">Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  <span>
                    {ingredient.name}
                    {ingredient.optional ? <small> (optional)</small> : null}
                  </span>
                  <span>{formatIngredientQuantity(ingredient, portion)}</span>
                </li>
              ))}
            </ul>
          </section>
          <p className="recipe-sheet-time">
            <Icon name="clock" />
            <span>Marinating time</span>
            <strong>{formatMarination(recipe)}</strong>
          </p>
          <section className="recipe-sheet-notes" aria-labelledby="notes-heading">
            <h3 id="notes-heading">Recipe notes</h3>
            <p>{recipe.notes}</p>
            <p className="recipe-sheet-flavor">{recipe.flavor}</p>
          </section>
        </div>
      </div>
    </Dialog>
  );
}
