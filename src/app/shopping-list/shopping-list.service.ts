import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    ingredientChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();

    addIngredient(ingrd: Ingredient) {
        this.ingredients.push(ingrd);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    //itemAdded = new EventEmitter<Ingredient>();
    addIngredients(ingrdts: Ingredient[]) {
        this.ingredients.push(...ingrdts);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    
}