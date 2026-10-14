import type { Ingredient, Recipe } from '../types';

export function formatIngredient(ingredient: Ingredient): string {
  const quantity =
    ingredient.amount === null
      ? ingredient.unit
      : `${ingredient.amount}${ingredient.maxAmount === undefined ? '' : `–${ingredient.maxAmount}`} ${ingredient.unit}`;
  return `${ingredient.name} — ${quantity}${ingredient.optional ? ' (optional)' : ''}`;
}

export function formatMarination(recipe: Recipe): string {
  const { min, max } = recipe.marinationMinutes;
  return `${min === max ? min : `${min}–${max}`} min`;
}
