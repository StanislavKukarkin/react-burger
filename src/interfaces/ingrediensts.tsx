import { TIngredient } from '@/utils/types';

export type GroupedIngredients = {
	bun: TIngredient[];
	sauce: TIngredient[];
	main: TIngredient[];
};

export type IngredientCategory = keyof GroupedIngredients;
