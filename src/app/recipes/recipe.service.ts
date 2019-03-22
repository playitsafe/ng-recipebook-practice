import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'Desc: This is simply a test', 
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Frech Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burger', 
            'Desc: This is simply a test', 
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Tomato', 20)
            ])
      ];

    constructor(private shoppinglistService: ShoppingListService) {}

    getRecipes() {
        // the slice() only returns a copy of that array
        return this.recipes.slice();
    }

    getRecipe(index) {
        return this.recipes[index];
    }

    addIngredientsToList(ingredients: Ingredient[]) {
        this.shoppinglistService.addIngredients(ingredients);
    }
}