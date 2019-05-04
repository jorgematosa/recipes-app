import { Ingredient } from './ingredient';
export interface Recipe {
  name: string;
  description: string;
  cookingSteps: string;
  isFavourite: boolean;
  imageSrc: string;
  ingredients: Ingredient[];
}
