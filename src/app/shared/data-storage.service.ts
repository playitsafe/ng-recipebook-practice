import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService) {}
    
    storeRecipes() {
        const token = this.authService.getIdToken();
        //put method will automatically turn array into json format
        return this.http.put(
            'https://ng-recipe-book-95e30.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes()
            );
    }

    getRecipes() {
        const token = this.authService.getIdToken();
        //add a query parameter
        //to instantly fire it
        this.http.get('https://ng-recipe-book-95e30.firebaseio.com/recipes.json?auth=' + 'token')
            .pipe(
                map((response: Recipe[]) => {
                        for (let recipe of response) {
                            if (!recipe['ingredients']) {
                                console.log(recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return response;
                    })
            )
            .subscribe(
                (response: Recipe[]) => {
                    //console.log(response);
                    this.recipeService.setRecipes(response);
                }
            );
    }
}