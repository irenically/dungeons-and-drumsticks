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
  const duration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return `${hours} h${remainder ? ` ${remainder} min` : ''}`;
  };
  if (min === max) return duration(min);
  if (max < 60) return `${min}–${max} min`;
  if (min >= 60 && min % 60 === 0 && max % 60 === 0) return `${min / 60}–${max / 60} h`;
  return `${duration(min)}–${duration(max)}`;
}
