export type Category = 'Herby' | 'Spicy' | 'Sweet' | 'Savory';
export interface Recipe {
  id: number;
  name: string;
  category: Category;
  tagline: string;
  ingredients: string[];
  description: string;
}
