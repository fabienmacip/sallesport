export interface Recette {
  id?: string;
  title: string;
  photo?: string;
  description?: string;
  preparationTime?: number;
  breakTime?: number;
  cookingTime?: number;
  ingredients? : string;
  steps?: string;
  allergens?: string;
  diets? : string;
}
