import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {

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

      //listen to it in the list comp
      recipeChanged = new Subject<Recipe[]>();

    
    constructor(private shoppinglistService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

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

    addRecipe(r: Recipe) {
        this.recipes.push(r);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}