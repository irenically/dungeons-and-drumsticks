import type { Ingredient, Recipe } from '../types';

export function formatIngredientQuantity(ingredient: Ingredient): string {
  return ingredient.amount === null
    ? ingredient.unit
    : `${ingredient.amount}${ingredient.maxAmount === undefined ? '' : `–${ingredient.maxAmount}`} ${ingredient.unit}`;
}

export function formatIngredient(ingredient: Ingredient): string {
  return `${ingredient.name} — ${formatIngredientQuantity(ingredient)}${ingredient.optional ? ' (optional)' : ''}`;
}

export function formatMarination(recipe: Recipe): string {
  const { min, max } = recipe.marinationMinutes;
  return `${min === max ? min : `${min}–${max}`} min`;
}
