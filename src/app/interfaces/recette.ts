export interface Recette {
  title: string;
  description?: string;
  preparationTime?: number;
  breakTime?: number;
  cookingTime?: number;
  ingredients? : string;
  steps?: string;
  allergens?: string;
  diets? : string;
}
