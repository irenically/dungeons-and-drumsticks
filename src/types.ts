export type Category = 'Herby' | 'Spicy' | 'Sweet' | 'Savory';
export interface Ingredient {
  name: string;
  amount: number | null;
  unit: string;
  maxAmount?: number;
  optional?: boolean;
}
export interface Recipe {
  id: number;
  name: string;
  flavor: string;
  region: string;
  ingredients: Ingredient[];
  marinationMinutes: { min: number; max: number };
  notes: string;
  comment?: string;
  ui: { category: Category; accentColor: string; image: string; ingredientPreviewCount?: number };
}
export interface ChickenGrimoire {
  title: string;
  edition: string;
  servingBase: { ingredient: string; amount: number; unit: string; state: string };
  recipes: Recipe[];
}
