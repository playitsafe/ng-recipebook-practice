import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    ingredientChanged = new EventEmitter<Ingredient[]>();

    addIngredient(ingrd: Ingredient) {
        this.ingredients.push(ingrd);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    //itemAdded = new EventEmitter<Ingredient>();
    addIngredients(ingrdts: Ingredient[]) {

        //option 1
        // for (let ingrdt of ingrdts) {
        //     this.addIngredient(ingrdt);
        // }

        //Option 2: directly add all ingredients in one go
          //push turns an array into a list
          //...(spread operator) into list of single ingredients
        this.ingredients.push(...ingrdts);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
    
}